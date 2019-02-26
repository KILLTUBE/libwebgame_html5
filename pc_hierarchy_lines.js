entity_lines_recursive = function(lines, parent) {
	for (var child of parent.children) {
		// add line from parent to child
		lines.push(parent.getPosition())
		lines.push(child.getPosition())
		// do same for all childs
		entity_lines_recursive(lines, child);
	}
}

entity_lines = function(parent) {
	var lines = [];
	entity_lines_recursive(lines, parent);
	return lines;
}

render_hierarchy_lines = function(entity) {
	var lines = entity_lines(entity)
	app.renderLines(lines, new pc.Color(1,0,0));	
}