import React, { Component } from 'react'
import PropTypes from '../_util/PropTypes'
import { getLocaleText } from '../_util'
import localesList from './locales'

export default class LyxHeader extends Component {
  static propTypes = {
    lang: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = {
    lang: 'zh_CN',
    title: '头部'
  }

  constructor(props) {
    super(props)
    const localang = localesList[props.lang] || {}
    this.state = {
      locales: Object.assign({}, localang, props.locales)
    }
  }

  render() {
    const { locales } = this.state
    const { title } = this.props
    return (
      <header className="m-header">
        {getLocaleText(locales['Login'], '登录')}
        {
          title
        }
      </header >
    )
  }
}
