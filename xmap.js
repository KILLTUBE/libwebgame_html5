/*
<?xml version="1.0"?>
<!DOCTYPE mapq3 SYSTEM "mapq3.dtd">
<mapq3>
  <entity>
    <brush>
      <plane>
        <shader>textures/common/clip</shader>
        <planepts>-14031 -486 12037 -13532 26 12325 -14031 486 12037</planepts>
        <texdef>1 32 0 1.000000 1.000000</texdef>
        <flags>1 0 0</flags>
      </plane>
      <plane>
        <shader>textures/common/clip</shader>
        <planepts>-13772 -26 12740 -14271 -486 12452 -14271 486 12452</planepts>
        <texdef>1 32 0 1.000000 1.000000</texdef>
        <flags>1 0 0</flags>
      </plane>
	  
...

*/


XMAP = function() {}

// await XMAP.fetch("http://127.0.0.1/ramp_1.xmap")
XMAP.fetch = async function(url) {
	var xml = await XML.fetch(url);
	return xml_to_xmap(xml);
}

Brush = function() {
	this.planes = [];
}

Brush.prototype.update = function() {
	// generate mesh data
}

BrushPlane = function(a, b, c, shader, texdef, flags) {
	this.a = a;
	this.b = b;
	this.c = c;
	this.shader = shader;
	this.texdef = texdef;
	this.flags = flags;
}

xml_to_xmap = function(xml) {
	var htmlbrushes = xml.documentElement.children[0].getElementsByTagName("brush");
	var brushes = []
	for (var htmlbrush of htmlbrushes) {
		var brush = new Brush;
		var htmlplanes = htmlbrush.getElementsByTagName("plane");
		for (var htmlplane of htmlplanes) {
			var shader          = htmlplane.getElementsByTagName("shader")[0].innerHTML;
			var planepts_string = htmlplane.getElementsByTagName("planepts")[0].innerHTML;
			var planepts_parts  = planepts_string.split(" ");
			var a               = new pc.Vec3(Number(planepts_parts[0]), Number(planepts_parts[1]), Number(planepts_parts[2]));
			var b               = new pc.Vec3(Number(planepts_parts[3]), Number(planepts_parts[4]), Number(planepts_parts[5]));
			var c               = new pc.Vec3(Number(planepts_parts[6]), Number(planepts_parts[7]), Number(planepts_parts[8]));
			var texdef          = htmlplane.getElementsByTagName("texdef")[0].innerHTML;
			var flags           = htmlplane.getElementsByTagName("flags")[0].innerHTML;
			var plane           = new BrushPlane(a, b, c, shader, texdef, flags);
			brush.planes.push( plane );
		}
		brushes.push(brush);
	}
	return brushes;
}