/**
 * 饼状图
 * TODO 数据写死
 */
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';
import Echarts from 'native-echarts';

export default class Pie extends Component {
	
	 constructor(props) {
        super(props);//这一句不能省略，照抄即可
      
    }

	render() {
		let pass = this.props.pass;
		let nopass = this.props.nopass;
		const option = {
			title: {
				x: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				x: 'left',
				data: ['通过: ' + pass, '不通过: ' + nopass]
			},
			toolbox: {
				show: true,
				feature: {
					mark: { show: true },
					dataView: { show: true, readOnly: false },
					magicType: {
						show: true,
						type: ['pie', 'funnel'],
						option: {
							funnel: {
								x: '25%',
								width: '50%',
								funnelAlign: 'left',
								max: 1548
							}
						}
					},
					restore: { show: true },
					saveAsImage: { show: true }
				}
			},
			calculable: true,
			series: [
				{
					name: '访问来源',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: [
						{ value: pass, name: ('通过: ' + pass) },
						{ value: nopass, name: ('不通过: ' + nopass) },
					]
				}
			]
		};

		return (
			<Echarts option={option} height={250} />
		);
	}
}

