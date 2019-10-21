import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { scaleBand, axisBottom, axisLeft, select, min, event } from 'd3';

import Overlay from '../Overlay';
import { rank, sortUniqueValues } from '../../utils';
import './Chart.scss';

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false, 
      product: null,
      metrics: {
        left: 0,
        top: 0
      }
    };
  }

  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate(prevProps) {
    if ( prevProps.data !== this.props.data) {
      this.createChart();
    }
  }

  createChart = () => {
    const { data } = this.props;
    if (!data) {
      return;
    }

    // converting price from string to float value
    let dataAry = data.results.map(item => {
      const newItem = {...item};
      newItem.price = parseFloat(item.price);
      return newItem;
    });
    const priceAry = dataAry.map(item => item.price);
    const favorAry = dataAry.map(item => item.Shop.num_favorers);
    const xRanks = rank(favorAry);
    const yRanks = rank(priceAry);
    dataAry.forEach((item, index) => {
      item.x = xRanks[index];
      item.y = yRanks[index];
    });
    const xDomains = sortUniqueValues(xRanks);
    const yDomains = sortUniqueValues(yRanks);
    
    const sizeMetrics = {
      width: this.containerNode.clientWidth,
      height: this.containerNode.clientHeight,
      top: 20,
      left: 40,
      bottom: 40,
      right: 20
    };

    const width = sizeMetrics.width - sizeMetrics.left - sizeMetrics.right;
    const height = sizeMetrics.height - sizeMetrics.top - sizeMetrics.bottom;
    
    // removing all children
    select(this.node).selectAll('*').remove();

    const svg = select(this.node)
      .append('g')
      .attr('transform', `translate(${sizeMetrics.left}, ${sizeMetrics.top})`);

    const xScale = scaleBand()
      .range([0, width])
      .domain(xDomains)
      .padding(0.1)
    const yScale = scaleBand()
      .range([height, 0])
      .domain(yDomains)
      .padding(0.1)

    // add X, Y axis
    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);
    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .selectAll('g.tick')
      .remove();
    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .selectAll('g.tick')
      .remove();
    
    // add X,Y axis labels
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2 + sizeMetrics.left)
      .attr("y", height + sizeMetrics.top + 10)
      .text("Shop Favorers");
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", - 20)
      .attr("x", - sizeMetrics.top - height / 2)
      .text("Price")

    select(this.node).on('click', () => {
      this.setState({ visible: false });
    });

    // calcuating image size
    const img_size = min([xScale.bandwidth(), yScale.bandwidth()]);

    let defs = svg.append('svg:defs');
    dataAry.forEach((item, index) => {
      defs.append("svg:pattern")
        .attr("id", `product${index}`)
        .attr("width", img_size) 
        .attr("height", img_size)
        .attr("patternUnits", "userSpaceOnUse")
        .append("svg:image")
        .attr("xlink:href", item.MainImage['url_75x75'])
        .attr("width", img_size)
        .attr("height", img_size)
        .attr("x", 0)
        .attr("y", 0);

      const x = xScale(item.x);
      const y = yScale(item.y);
      const rectSvg = svg.append("rect")
        .attr("transform", "translate(" + x + "," + y + ")")
        .attr("width", img_size)
        .attr("height", img_size)
        .attr("rx", img_size / 4)
        .style("fill", `url(#product${index})`)
        .style("stroke", 'darkgrey')
        .style("stroke-width", 2);

      rectSvg.on('mouseover', d => {
        // calculating absolute position
        const metrics = {};
        if ( event.pageX + 200 > width ) {
          metrics.right = sizeMetrics.width - event.pageX;
          metrics.left = 'unset';
        } else {
          metrics.left = event.pageX;
          metrics.right = 'unset';
        }
        if ( event.pageY + 300 > height ) {
          metrics.bottom = sizeMetrics.height - event.pageY;
          metrics.top='unset';
        } else {
          metrics.top = event.pageY;
          metrics.bottom='unset';
        }

        this.setState({
          visible: true,
          product: item,
          metrics
        });
      });
    });
  }

  render() {
    const { className } = this.props;
    const { product, visible, metrics } = this.state;

    return (
      <div className={cn(className, 'chart-wrapper')} ref={ ref => this.containerNode = ref }>
        <svg ref={ ref => this.node = ref } width='100%' height='100%'/>
        {visible && (
          <Overlay
            ref={ ref => this.overlayNode = ref }
            style={metrics}
            className={ visible ? 'overlay' : 'overlay hidden'}
            product={product}
          />
        )}
        
      </div>
    );
  }
}

Chart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object
}

export default Chart;