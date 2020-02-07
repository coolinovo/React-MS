import React, { Component, createRef } from 'react' // createRef 在 react 中使用 dom
import { Card, Row, Col, message, Spin } from 'antd'
import echarts from 'echarts'
import { getAmount } from '../../requests/ajax'

import './dashboard.less'

export default class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.articleAmount = createRef()
    this.state = {
      amount: [],
      isLoading: false
    }
  }
  // 发送获取浏览量请求
  getRecAmount = async () => {
    this.setState({
      isLoading: true
    })
    try {
      const response = await getAmount()
      message.success('获取数据成功！')
      this.setState({
        amount: response.amount
      })
      // 初始化图表数据
      this.initArticleChart()
    } catch (err) {
      message.error('获取数据失败！')
    } finally {
      this.setState({
        isLoading: false
      })
    }
  }
  // echarts 初始化
  initArticleChart = () => {
    // 配置数据
    const option = {
      title: {
        text: '阅读量变化'
      },
      legend: {
        data: ['阅读量']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.state.amount.map(item => {
          return item.month
        })
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        // name: '销量',
        areaStyle: {},
        type: 'line',
        data:  this.state.amount.map(item => {
          return item.value
        })
      }]
    }
    // 使用指定的配置项喝数据显示图标
    this.articleChart.setOption(option)
  }

  componentDidMount() {
    this.articleChart = echarts.init(this.articleAmount.current)
    this.getRecAmount()
  }

  render() {
    return (
      <div>
        <Card
          title='概览'
          bordered={false}
        >
          <Row gutter={16}>
            <Col className='lin-gutter-row' span={6}>
              <div className='lin-gutter-box' style={{backgroundColor: '#29B6f6'}} col-6='true'></div>
            </Col>
            <Col className='lin-gutter-row' span={6}>
              <div className='lin-gutter-box' style={{backgroundColor: '#AB47BC'}} col-6='true'></div>
            </Col>
            <Col className='lin-gutter-row' span={6}>
              <div className='lin-gutter-box' style={{backgroundColor: '#FF7043'}} col-6='true'></div>
            </Col>
            <Col className='lin-gutter-row' span={6}>
              <div className='lin-gutter-box' style={{backgroundColor: '#43a047'}} col-6='true'></div>
            </Col>
          </Row>
        </Card>
        <Spin spinning={this.state.isLoading}>
          <Card title='文章近期浏览量' bordered={false}>
            <div ref={this.articleAmount} style={{height: '400px'}}/>
          </Card>
        </Spin>
      </div>
    )
  }
}