import * as React from 'react';
import { Consumer } from './context';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { ActionSheetProps } from './types';

export default function connectActionSheet<OwnProps = any>(
  WrappedComponent: React.ComponentType<OwnProps & ActionSheetProps>
) {
  const ConnectedActionSheet = (props: OwnProps) => {
    const { forwardedRef, ...rest } = props
    return (
      <Consumer>
        {({ showActionSheetWithOptions }) => {
          return (
            <WrappedComponent ref={forwardedRef} {...rest} showActionSheetWithOptions={showActionSheetWithOptions} />
          );
        }}
      </Consumer>
    );
  };
  
  const ForwardedComponent = React.forwardRef((props, ref) => {
    return <ConnectedActionSheet {...props} forwardedRef={ref} />;
  })

  return hoistNonReactStatic(ForwardedComponent, WrappedComponent);
}
