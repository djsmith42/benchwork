/** @jsx React.DOM */
var Table = React.createClass({
    render: function() {
        var rowNodes = this.props.rows.map(function(x) {
            return (
              <TableRow x={x}></TableRow>
            )
        });
        return (
          <table className="table">
            {rowNodes}
          </table>
        )
    }
});

/** @jsx React.DOM */
var TableRow = React.createClass({
    render: function() {
        return (
            <tr>
              <td>{this.props.x.a}</td>
              <td>{this.props.x.a}</td>
              <td>{this.props.x.a}</td>
              <td>{this.props.x.a}</td>
              <td>{this.props.x.a}</td>
              <td>{this.props.x.a}</td>
            </tr>
        )
    }
});

var testRows = [];
for (var i=0; i<1000; i++) {
    testRows.push({a: i});
}

function now() {
    if (window.performance) {
        return window.performance.now();
    } else {
        return (new Date).getTime();
    }
}

function test1() {
    var start = now();
    React.renderComponent(
      <Table rows={testRows}/>,
      document.getElementById('test1'),
      function done() {
          var end = now();
          var elapsed = (end-start)
          React.renderComponent(
            <span>{elapsed} ms</span>,
            document.getElementById('test1results')
          );
      }
    );
}
