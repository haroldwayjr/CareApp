import {
  cloneElement,
  forwardRef,
  useMemo,
  useRef,
  type CSSProperties,
  type ReactElement,
  type Ref,
} from 'react'
import { Transition } from 'react-transition-group'
import type { TransitionProps } from '@mui/material/transitions'
import useMediaQuery from '@mui/material/useMediaQuery'
import useForkRef from '@mui/utils/useForkRef'

/** Gentler than MUI default enter/exit — Airbnb-style rise + fade. */
export const RISE_DURATION_MS = 320

type RiseChildProps = {
  style?: CSSProperties
  ref?: Ref<HTMLElement>
}

/**
 * Subtle rise (~48px) + fade — modal stays near center; does not slide from the
 * bottom of the viewport. Respects prefers-reduced-motion (fade only).
 */
export const RiseTransition = forwardRef(function RiseTransition(
  props: TransitionProps & { children: ReactElement<RiseChildProps> },
  ref: Ref<unknown>,
) {
  const {
    in: inProp,
    children,
    onEnter,
    onEntered,
    onExit,
    onExited,
    onEntering,
    onExiting,
    addEndListener,
    style,
    timeout = RISE_DURATION_MS,
    appear = true,
    mountOnEnter,
    unmountOnExit,
  } = props

  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)', {
    defaultMatches: false,
    noSsr: true,
  })

  const nodeRef = useRef<HTMLElement>(null)
  const handleRef = useForkRef(
    nodeRef,
    (children as ReactElement<RiseChildProps>).props.ref,
    ref,
  )

  const riseBaseStyle = useMemo<CSSProperties>(() => {
    if (reduceMotion) {
      return {
        transition: `opacity ${RISE_DURATION_MS}ms ease-out`,
        opacity: 0,
        willChange: 'opacity',
      }
    }
    return {
      transition: `opacity ${RISE_DURATION_MS}ms ease-out, transform ${RISE_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      opacity: 0,
      transform: 'translateY(48px)',
      willChange: 'opacity, transform',
    }
  }, [reduceMotion])

  const riseStateStyles = useMemo<Record<string, CSSProperties>>(() => {
    if (reduceMotion) {
      return {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
      }
    }
    return {
      entering: { opacity: 1, transform: 'translateY(0)' },
      entered: { opacity: 1, transform: 'translateY(0)' },
      exiting: { opacity: 0, transform: 'translateY(48px)' },
      exited: { opacity: 0, transform: 'translateY(48px)' },
    }
  }, [reduceMotion])

  const resolvedTimeout =
    typeof timeout === 'number'
      ? timeout
      : {
          appear: timeout.appear ?? timeout.enter ?? RISE_DURATION_MS,
          enter: timeout.enter ?? RISE_DURATION_MS,
          exit: timeout.exit ?? RISE_DURATION_MS,
        }

  return (
    <Transition
      appear={appear}
      in={inProp}
      nodeRef={nodeRef}
      timeout={resolvedTimeout}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      addEndListener={
        addEndListener
          ? (done) => {
              if (nodeRef.current) {
                addEndListener(nodeRef.current, done)
              } else {
                done()
              }
            }
          : undefined
      }
      onEnter={(isAppearing) => {
        if (nodeRef.current) {
          // Force layout so the enter animation starts from the initial styles.
          void nodeRef.current.offsetHeight
          onEnter?.(nodeRef.current, isAppearing)
        }
      }}
      onEntering={(isAppearing) => {
        if (nodeRef.current) onEntering?.(nodeRef.current, isAppearing)
      }}
      onEntered={(isAppearing) => {
        if (nodeRef.current) onEntered?.(nodeRef.current, isAppearing)
      }}
      onExit={() => {
        if (nodeRef.current) onExit?.(nodeRef.current)
      }}
      onExiting={() => {
        if (nodeRef.current) onExiting?.(nodeRef.current)
      }}
      onExited={() => {
        if (nodeRef.current) onExited?.(nodeRef.current)
      }}
    >
      {(state) =>
        cloneElement(children, {
          ref: handleRef,
          style: {
            ...riseBaseStyle,
            ...style,
            ...riseStateStyles[state],
            ...children.props.style,
          },
        })
      }
    </Transition>
  )
})
