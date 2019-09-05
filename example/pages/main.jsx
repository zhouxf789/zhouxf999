import React, { Component } from 'react'
import { LyxHeader } from 'lyxcool-test'
require('lyxcool-test/lib/less')

let lang = 'zh_CN'
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.querySelector('body').setAttribute('lang', lang)
  }

  render() {
    return (
      <div className="m-container">
        <LyxHeader lang={lang} title={'测试test'} />
      </div>
    )
  }
}

