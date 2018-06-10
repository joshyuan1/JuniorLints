import React from 'react';
import Tooltip from 'rc-tooltip';

function HighlightLegend() {


  const text1 = <span>Convention</span>;
  const text2 = <span>Warning</span>;
  const text3 = <span>Multiple Errors</span>;
  const text4 = <span>Fatal</span>;

  const style1 = {
    position: 'relative',
    display: 'table-cell',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    background: '#dbffdb',
    margin: '100px 0px 0px 0px',
    verticalAlign: 'middle',
    border: '10px solid white',
  };

  const style2 = {
    position: 'relative',
    display: 'table-cell',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    background: '#ffffb3',
    margin: '100px 0px 0px 0px',
    verticalAlign: 'middle',
    border: '10px solid white',
  };

  const style3 = {
    position: 'relative',
    display: 'table-cell',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    background: '#e6b3e6',
    margin: '100px 0px 0px 0px',
    verticalAlign: 'middle',
    border: '10px solid white',
  };

  const style4 = {
    position: 'relative',
    display: 'table-cell',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    background: '#f65555',
    margin: '100px 0px 0px 0px',
    verticalAlign: 'middle',
    border: '10px solid white',
  };

  return (
    <div>
      <Tooltip placement="top" overlay={text1}>
        <p href="#" style={style1} />
      </Tooltip>
      <Tooltip placement="top" overlay={text2}>
        <p href="#" style={style2} />
      </Tooltip>
      <Tooltip placement="top" overlay={text3}>
        <p href="#" style={style3} />
      </Tooltip>
      <Tooltip placement="top" overlay={text4}>
        <p  href="#" style={style4} />
      </Tooltip>
    </div>
  );
}

export default HighlightLegend;
