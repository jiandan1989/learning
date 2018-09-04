/**
 * @name: CodeEditor
 * @desc: codemirror 代码编辑
 * @param:
 * config: 配置选项
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import html from 'html';

import './index.less';
import '../../codemirror/index';

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.codeContainter = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    this.setCodeMirror();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.config !== nextProps.config && this.codeMirror) {
      for (const optionName in nextProps.config) {
        if (nextProps.config.hasOwnProperty(optionName)) {
          this.codeMirror.setOption(optionName, nextProps.config[optionName]);
        }
      }
    }
  }
  componentWillUnmount() {
    if (this.codeMirror && typeof this.codeMirror.toTextArea === 'function') {
      this.codeMirror.toTextArea();
    }
  }

  setCodeMirror() {
    const { value, config } = this.props;
    const codeContainter = this.codeContainter.current;
    this.codeMirror = CodeMirror(codeContainter, config);
    this.codeMirror.setValue(html.prettyPrint(value));
  }
  render() {
    return <div className="code_warpper" ref={this.codeContainter} />;
  }
}

CodeEditor.propTypes = {
  config: PropTypes.object,
  // value: PropTypes.string,
  // setOption: PropTypes.func
};

CodeEditor.defaultProps = {
  setOption() {},
  config: {
    mode: 'text/javascript',
    // mode: 'application/xml',
    htmlMode: true,
    lineNumbers: true, // 显示行号
    theme: 'default',
    // lineSeparator: null, // 设置分行符
    indentUnit: 2, // 缩进空格
    tabSize: 2, // tabSize
    // indentWithTabs: false, // 缩进
    // electricChars: true,
    // keyMap: 'default',
    lineWrapping: false // 过长时,是否可滚动
    // inputStyle: 'contenteditable',
    // rtlMoveVisually
  },
  value: `<!DOCTYPE html>
  <html lang="en"><head><meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <!--
        manifest.json provides metadata used when your web app is added to the
        homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
      -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="icon" type="image/jpeg" href="%PUBLIC_URL%/You.jpeg">
    <title>Antd-Demo</title>
  </head>

  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
  </body>

  </html>
  `
};

export default CodeEditor;
