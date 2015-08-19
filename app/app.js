var FlexGrid = React.createClass({
	render: function() {
			return (
				<div></div>
			);
	},

	getInitialState: function() {
	return {

	// Grid options
	gridOpts: {
	selectionMode: wijmo.grid.SelectionMode.Cell,
	showSort: false,
	autoGenerateColumns: false,
	columns: [
	{header: "ID3", "binding":"country", "width":"*"},
	{"header": "Country", "binding":"country", "width":"*"},
	{"header": "Amount", "binding":"amount", "width":"*"}
	],
	//note here that we are defining the formatter function here note that this calls the formatter in our script to actually apply the styling
	// the getAmountColor is the same funciton being called by both grids
	itemFormatter: function(panel, r, c, cell){
	// validate CellType and if correct column
	if (wijmo.grid.CellType.Cell == panel.cellType &&
	panel.columns[c].binding == 'amount') {

	// get the cell's data
	var cellData = panel.getCellData(r, c);

	// set cell's foreground color
	cell.style.color = getAmountColor(cellData);
	}
	},
	},

	// Default data
	grid_01_data: [
	{"id":0, "country":"Greece", "amount": 2000},
	{"id":1, "country":"USA", "amount": 100},
	{"id":2, "country":"UK", "amount": 750},
	{"id":3, "country":"Germany", "amount": 1500},
	{"id":4, "country":"Japan", "amount": 2000},
	{"id":5, "country":"Greece", "amount": 3000},
	]

	};
	},

	//  Invoked once, both on the client and the server, immediately before the initial render occurs.    
	componentWillMount: function() 
	{
	this.cv = new wijmo.collections.CollectionView( this.state.grid_01_data );
	this.cv.pageSize = 6;
	},
	componentDidMount: function() 
	{
	// Create and connect the grid
	this.grid = new wijmo.grid.FlexGrid( this.getDOMNode(this.refs.grid_01), this.state.gridOpts);
	this.grid.itemsSource = this.cv;

	},
	// Inovolked immediately after the component's updates are flushed to the DOM, this method is not called after initial render.
	// Use this an 
	componentWillUnmount: function() {
	var div = React.findDOMNode(this);
	var grid = wijmo.Control.getControl(div);
	grid.dispose();
	}


});
React.render(
<FlexGrid/>,
document.getElementById('grid_01')
);
