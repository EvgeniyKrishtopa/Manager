import React from 'react';

import { TextError } from 'components/Styled/Index';

type Props = {
  message: string;
};
type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: never) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: never, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <TextError>{this.props.message}</TextError>;
    }

    return this.props.children;
  }
}
