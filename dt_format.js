var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

var days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

function times(s, n) {
	return Array(n+1).join(s);
}

function zeropad(i, n) {
	i = i.toString();
	return times('0', n-i.length) + i;
}

function date_format(d, f) {
	if (!Date.prototype.isPrototypeOf(d)) {
		throw 'd is not a date object';
	}

	// I wanted not to have to do this, but no! One hipster format couldn't be nicely determined with just one statement! ;_;
	function swatch_internet_time(d) {
		var h = (d.getUTCHours() === 23) ? 0 : d.getUTCHours() + 1;
		var m = d.getUTCMinutes();
		var s = d.getUTCSeconds();

		return Math.floor(Math.abs(((h * 60 + m) * 60 + s) / 86.4));
	}

	return f.replace(/([dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU])/g,
		function(x)
		{
			switch (x)
			{
				case 'd': return zeropad(d.getDate(), 2);
				case 'D': return days[d.getDay()].substr(0, 3);
				case 'j': return d.getDate();
				case 'l': return days[d.getDay()];
				case 'N': return d.getDay() === 0 ? 7 : d.getDay();
				case 'S': return (dt = d.getDate() % 10) === 1 ? 'st' : (dt % 10) === 2 ? 'nd' : 'th';
				case 'w': return d.getDay();
				case 'z': return Math.ceil((d - new Date(d.getFullYear(), 0, 1)) / 86400000);
				case 'W': return Math.ceil(date_format(d, 'z') / 7); 
				case 'F': return months[d.getMonth()];
				case 'm': return zeropad((d.getMonth() + 1), 2);
				case 'M': return months[d.getMonth()].substr(0, 3);
				case 'n': return d.getMonth()+1;
				case 't': return new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();
				case 'L': return !((yr = d.getFullYear() % 4) || (!(yr % 100) && (yr % 400))) ? 1 : 0;
				case 'o': return d.getFullYear(); //i think this is right maybe
				case 'Y': return d.getFullYear();
				case 'y': return d.getFullYear().toString().slice(2,4);
				case 'a': return d.getHours() < 12 ? 'am' : 'pm';
				case 'A': return d.getHours() < 12 ? 'AM' : 'PM';
				case 'B': return swatch_internet_time(d); //https://en.wikipedia.org/wiki/Swatch_Internet_Time
				case 'g': return (h = d.getHours() % 12) ? h : 12;
				case 'G': return d.getHours();
				case 'h': return zeropad(((h = d.getHours() % 12) ? h : 12), 2);
				case 'H': return zeropad(d.getHours(), 2);
				case 'i': return zeropad(d.getMinutes(), 2);
				case 's': return zeropad(d.getSeconds(), 2);
				case 'u': return d.getMilliseconds() * 1000 //JS has no microseconds
				case 'I': return d.getTimezoneOffset() < (Math.max((new Date(d.getFullYear(), 0, 1)).getTimezoneOffset(), (new Date(d.getFullYear(), 6, 1)).getTimezoneOffset())) ? 1 : 0;
				case 'O': return ((tz = d.getTimezoneOffset()/6) > 0 ? '+' : '-') + zeropad(tz*10, 4);
				case 'P': return ((tz = d.getTimezoneOffset()/6) > 0 ? '+' : '-') + zeropad(tz/10, 2) + ':00';
				case 'T': return / \(([A-Z]+)\)$/.exec(d.toTimeString())[1];
				case 'Z': return d.getTimezoneOffset()*60;
				case 'c': return d.toISOString();	
				case 'r': return date_format(d, 'D, d M Y H:i:s O');
				case 'U': return d.getTime()/100;
				default: return '';
			}
		}
	);


}

d = new Date(2014, 0, 21, 2, 3, 4);
print(date_format(d,'M/d/Y h:i:s (U)'))
print(date_format(d,'r'));
