// specify options
var options = {
    width: '100%',
    height: '100%',
    style: 'surface',
    showPerspective: true,
    style: "bar-color",
    dataColor: {
        strokeWidth: 5
    },
    tooltip: true,
    xLabel: "total successes",
    yLabel: "advantages",
    zLabel: "likelihood",
    xStep: 1,
    yStep: 1
};

function getKey(face){
	return face.triumphs + "," + face.despairs;
}

function getCount(map){
	var count = 0;
	var mapValues = Array.from(map.values());
	for(var i = 0; i < mapValues.length; i++){
		count += mapValues[i];
	}
	var faceCount = document.getElementById('faceCount');
	faceCount.innerHTML = count;
	return count;
}

function mapToDataMap(map){
	var count = getCount(map);
	var mapKeys = Array.from(map.keys());
	var mapOfData = new Map();
	for(var i = 0; i < mapKeys.length; i++){
		var face = Face.fromString(mapKeys[i]);
		var key = getKey(face);
		var dataset = mapOfData.get(key);
		if(dataset == null){
			dataset = new vis.DataSet();
			mapOfData.set(key, dataset);
		}
		dataset.add({
			x: face.totalSuccessCount,
			y: face.advantages,
			z: map.get(mapKeys[i]),
			style: map.get(mapKeys[i])
		});
	}
	return mapOfData;
}

function custom(x, y){
	return x+y;
}

function drawVisualization() {
    // Create and populate a data table.
    var data = new vis.DataSet();
    // create some nice looking data with sin/cos
    for (var x = 0; x < 20; x++) {
        for (var y = 0; y < 7; y++) {
            var value = custom(x, y);
            data.add({
                x: x,
                y: y,
                z: value,
                style: value
            });
        }
    }

    // create a graph3d
    var container = document.getElementById('resultsDisplay');
    new vis.Graph3d(container, data, options);
}

function drawVisualizationOfData(data) {
    // create a graph3d
    var container = document.getElementById('resultsDisplay');
    new vis.Graph3d(container, data, options);
}

function getColumnCount(keys){
	var columnCount = 1;
	for(var i = 0; i < keys.length; i++){
		var value = keys[i];
		var c = parseInt(value.split(",")[0]) + 1;
		if(c > columnCount){
			columnCount = c;
		}
	}
	return columnCount;
}

function getRowCount(keys){
	var rowCount = 1;
	for(var i = 0; i < keys.length; i++){
		var value = keys[i];
		var c = parseInt(value.split(",")[1]) + 1;
		if(c > rowCount){
			rowCount = c;
		}
	}
	return rowCount;
}

var GRID_TEMPLATE_COLUMNS = "grid-template-columns";
var AUTO = "auto ";

function drawVisualizationOfDataGrid(data) {
    var container = document.getElementById('resultsDisplay');
    container.innerHTML = "";
	var mapKeys = Array.from(data.keys());
	var columnCount = getColumnCount(mapKeys);
	var rowCount = getRowCount(mapKeys);
	var templateValue = "";
	for(var i = 0; i < columnCount; i++){
		templateValue += AUTO;
	}
	container.style[GRID_TEMPLATE_COLUMNS] = templateValue;
	for(var i = 0; i < mapKeys.length; i++){
		var square = document.createElement('div');
		container.appendChild(square);
		square.id = mapKeys[i];
		square.style.width = "500px";
		square.style.height = "500px";
		square.style.border = "1px solid rgba(0, 0, 0, 0.8)";
		new vis.Graph3d(square, data.get(mapKeys[i]), options);
	}
    // graph3d = new vis.Graph3d(container, data, options);
}

function generate(){
	var boost = document.getElementById('Boost');
	var ability = document.getElementById('Ability');
	var proficiency = document.getElementById('Proficiency');
	var setback = document.getElementById('Setback');
	var difficulty = document.getElementById('Difficulty');
	var challenge = document.getElementById('Challenge');

	var dicePool = [];
	addDice(dicePool, Die.createBoost, boost.value);
	addDice(dicePool, Die.createAbility, ability.value);
	addDice(dicePool, Die.createProficiency, proficiency.value);
	addDice(dicePool, Die.createSetback, setback.value);
	addDice(dicePool, Die.createDifficulty, difficulty.value);
	addDice(dicePool, Die.createChallenge, challenge.value);

	var results = getAllResults(dicePool);
	var reduced = toMap(results);
	var dataMap = mapToDataMap(reduced);
	drawVisualizationOfDataGrid(dataMap);
}

function addDice(pool, func, count){
	for(var i = 0; i < count; i++){
		pool.push(func());
	}
}