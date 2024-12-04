'use client';

import React, {
    forwardRef,
    Fragment,
    memo,
    type Ref,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import ReactDOM from 'react-dom';
import invariant from 'tiny-invariant';

import Avatar from '@atlaskit/avatar';
import { DropdownItem } from '@atlaskit/dropdown-menu';
import Heading from '@atlaskit/heading';
import {
    attachClosestEdge,
    type Edge,
    extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
    draggable,
    dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { dropTargetForExternal } from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import { Box, Grid, Stack, xcss } from '@atlaskit/primitives';
import { token } from '@atlaskit/tokens';

import { type ColumnType, type TodoItem } from './people';

import { useBoardContext } from './boardContext';
import { useColumnContext } from './columnContext';

type State =
    | { type: 'idle' }
    | { type: 'preview'; container: HTMLElement; rect: DOMRect }
    | { type: 'dragging' };

const idleState: State = { type: 'idle' };
const draggingState: State = { type: 'dragging' };

const noMarginStyles = xcss({ margin: 'space.0' });
const baseStyles = xcss({
    width: '100%',
    padding: 'space.200',
    // @ts-ignore
    backgroundColor: '#454545',
    borderRadius: 'border.radius.200',
    position: 'relative',
    cursor: 'pointer',
    ':hover': {
        // @ts-ignore
        backgroundColor: '#e7e6e6',
        color: 'color.text.accent.gray.bolder',
    },
});

const stateStyles: {
    [Key in State['type']]: ReturnType<typeof xcss> | undefined;
} = {
    idle: xcss({
        cursor: 'grab',
        boxShadow: 'elevation.shadow.raised',
    }),
    dragging: xcss({
        opacity: 0.4,
        boxShadow: 'elevation.shadow.raised',
    }),
    // no shadow for preview - the platform will add it's own drop shadow
    preview: undefined,
};

type CardPrimitiveProps = {
    closestEdge: Edge | null;
    item: TodoItem;
    state: State;
};

function MoveToOtherColumnItem({
    targetColumn,
    startIndex,
}: {
    targetColumn: ColumnType;
    startIndex: number;
}) {
    const { moveCard } = useBoardContext();
    const { columnId } = useColumnContext();

    const onClick = useCallback(() => {
        moveCard({
            startColumnId: columnId,
            finishColumnId: targetColumn.columnId,
            itemIndexInStartColumn: startIndex,
        });
    }, [columnId, moveCard, startIndex, targetColumn.columnId]);

    return <DropdownItem onClick={onClick}>{targetColumn.title}</DropdownItem>;
}

const CardPrimitive = forwardRef<HTMLDivElement, CardPrimitiveProps>(function CardPrimitive(
    { closestEdge, item, state },
    ref,
) {
    const { column, title, description, todoId } = item;

    return (
        <Grid
            ref={ref}
            testId={`item-${todoId}`}
            templateColumns="auto 1fr auto"
            columnGap="space.100"
            alignItems="center"
            xcss={[baseStyles, stateStyles[state.type]]}
        >
            <Avatar size="large">
                {(props) => (
                    // Note: using `div` rather than `Box`.
                    // `CustomAvatarProps` passes through a `className`
                    // but `Box` does not accept `className` as a prop.
                    <div
                        {...props}
                        // Workaround to make `Avatar` not draggable.
                        // Ideally `Avatar` would have a `draggable` prop.
                        // eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
                        
                        ref={props.ref as Ref<HTMLDivElement>}
                    />
                )}
            </Avatar>
            <Stack space="space.050" grow="fill">
                {/* @ts-ignore */}
                <Heading color="#fcfcfc" size="small" as="span">
                    {title}
                </Heading>
                <Box as="small" xcss={noMarginStyles}>
                    {description}
                </Box>
            </Stack>

            {closestEdge && <DropIndicator edge={closestEdge} gap={token('space.100', '0')} />}
        </Grid>
    );
});

export const Card = memo(function Card({ item }: { item: TodoItem }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const { todoId } = item;
    const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
    const [state, setState] = useState<State>(idleState);

    const { instanceId, registerCard } = useBoardContext();
    useEffect(() => {
        invariant(ref.current);
        return registerCard({
            cardId: todoId,
            // @ts-ignore
            entry: {
                element: ref.current,
            },
        });
    }, [registerCard, todoId]);

    useEffect(() => {
        const element = ref.current;
        invariant(element);
        return combine(
            draggable({
                element: element,
                getInitialData: () => ({ type: 'card', itemId: todoId, instanceId }),
                onGenerateDragPreview: ({ location, source, nativeSetDragImage }) => {
                    const rect = source.element.getBoundingClientRect();

                    setCustomNativeDragPreview({
                        nativeSetDragImage,
                        getOffset: preserveOffsetOnSource({
                            element,
                            input: location.current.input,
                        }),
                        render({ container }) {
                            setState({ type: 'preview', container, rect });
                            return () => setState(draggingState);
                        },
                    });
                },

                onDragStart: () => setState(draggingState),
                onDrop: () => setState(idleState),
            }),
            dropTargetForExternal({
                element: element,
            }),
            dropTargetForElements({
                element: element,
                canDrop: ({ source }) => {
                    return source.data.instanceId === instanceId && source.data.type === 'card';
                },
                getIsSticky: () => true,
                getData: ({ input, element }) => {
                    const data = { type: 'card', itemId: todoId };

                    return attachClosestEdge(data, {
                        input,
                        element,
                        allowedEdges: ['top', 'bottom'],
                    });
                },
                onDragEnter: (args) => {
                    if (args.source.data.itemId !== todoId) {
                        setClosestEdge(extractClosestEdge(args.self.data));
                    }
                },
                onDrag: (args) => {
                    if (args.source.data.itemId !== todoId) {
                        setClosestEdge(extractClosestEdge(args.self.data));
                    }
                },
                onDragLeave: () => {
                    setClosestEdge(null);
                },
                onDrop: () => {
                    setClosestEdge(null);
                },
            }),
        );
    }, [instanceId, item, todoId]);

    return (
        <Fragment>
            <CardPrimitive
                ref={ref}
                item={item}
                state={state}
                closestEdge={closestEdge}
            />
            {state.type === 'preview' &&
                ReactDOM.createPortal(
                    <Box
                        style={{
                            /**
                             * Ensuring the preview has the same dimensions as the original.
                             *
                             * Using `border-box` sizing here is not necessary in this
                             * specific example, but it is safer to include generally.
                             */
                            // eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
                            boxSizing: 'border-box',
                            width: state.rect.width,
                            height: state.rect.height,
                        }}
                    >
                        <CardPrimitive item={item} state={state} closestEdge={null} />
                    </Box>,
                    state.container,
                )}
        </Fragment>
    );

});