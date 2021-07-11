import { IToastProps, Toaster, IToasterProps, Position, H5, AnchorButton, Intent } from '@blueprintjs/core'

// type IToastDemo = IToastProps & { button: string };

// const POSITIONS = [
//     Position.TOP_LEFT,
//     Position.TOP,
//     Position.TOP_RIGHT,
//     Position.BOTTOM_LEFT,
//     Position.BOTTOM,
//     Position.BOTTOM_RIGHT,
// ];

export const state: IToasterProps = {
  autoFocus: false,
  canEscapeKeyClear: true,
  position: Position.BOTTOM_RIGHT,
}

export enum EToastType {
  DEFAULT,
  SUCCESS,
  ERROR,
}

let toaster: Toaster
export const refHandlers = {
  toaster: (ref: Toaster): any => (toaster = ref),
}

export const addToast = (toast: IToastProps): any => {
  // toast.className = this.props.data.themeName;
  toast.timeout = 5000
  toaster.show(toast)
}

export function notify({
  message,
  description,
  txid,
  type = EToastType.DEFAULT,
}: {
  message: string
  description?: string | JSX.Element
  txid?: string
  type?: EToastType
}): any {
  if (EToastType.SUCCESS) {
    return addToast({
      icon: 'tick',
      intent: Intent.SUCCESS,
      message: (
        <>
          <H5>{message}</H5>
          {description}
          {txid && (
            <AnchorButton outlined href={'https://solscan.io/tx/' + txid}>
              View TX
            </AnchorButton>
          )}
        </>
      ),
    })
  }
  if (type === EToastType.ERROR) {
    return addToast({
      icon: 'ban-circle',
      intent: Intent.DANGER,
      message: (
        <>
          <H5>{message}</H5>
          {description}
        </>
      ),
    })
  } else {
    return addToast({
      icon: 'info-sign',
      intent: Intent.PRIMARY,
      message: (
        <>
          <H5>{message}</H5>
          {description}
        </>
      ),
    })
  }
}

export const SuccesToast = (title: string, message: string): any => {
  return addToast({
    icon: 'tick',
    className: 'toast-success',
    message: (
      <>
        <H5>{title}</H5>
        {message}
      </>
    ),
  })
}

export const PrimaryToast = (title: string, message: string): any => {
  return addToast({
    icon: 'tick',
    className: 'toast-primary',
    message: (
      <>
        <H5>{title}</H5>
        {message}
      </>
    ),
  })
}

export const ErrorToast = (errorMessage: string): any => {
  return addToast({
    icon: 'ban-circle',
    className: 'toast-error',
    message: `${errorMessage}`,
  })
}
