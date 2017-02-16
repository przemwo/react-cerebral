import React, { Component } from 'react';

let globalTitle;

export function useGlobalTitle (title) {
  globalTitle = title;
}

export default function setTitle (pageTitle) {
  return ComposedComponent => class extends Component {
    static displayName = `setTitle(${ComposedComponent.displayName})`;

    componentDidMount () {
      document.title = pageTitle + (globalTitle ? ' | ' + globalTitle : '');
    }

    render () {
      return <ComposedComponent {...this.props} />;
    }
  };
}
