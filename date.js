function date(d, f) {
	var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

	var days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

	if (!Date.prototype.isPrototypeOf(d)) {
		throw 'd is not a date object';
	}

	function times(s, n) {
		return Array(n+1).join(s);
	}

	function pad(i, n, s) {
		i = i.toString();
		return times(s, n-i.length) + i;
	}

	function zeropad(i, n) {
		return pad(i, n, '0');
	}

	return f.replace(/([dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU])/g,
		function ($0, $1, index)
		{
			if (f[index-1] === "\\") {
				return $1;
			}

			switch ($1)
			{
				case 'd': return zeropad(d.getDate(), 2);
				case 'D': return days[d.getDay()].substr(0, 3);
				case 'j': return d.getDate();
				case 'l': return days[d.getDay()];
				case 'N': return d.getDay() === 0 ? 7 : d.getDay();
				case 'S': return (dt = d.getDate() % 10) === 1 ? 'st' : (dt % 10) === 2 ? 'nd' : 'th';
				case 'w': return d.getDay();
				case 'z': return Math.ceil((d - new Date(d.getFullYear(), 0, 1)) / 86400000);
				case 'W': return Math.ceil(date(d, 'z') / 7); 
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
				case 'B': return Math.floor(((d.getUTCHours() * 3600) + (d.getUTCMinutes() * 60) + d.getUTCSeconds() + 3600) / 86.4);
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
				case 'r': return date(d, 'D, d M Y H:i:s O');
				case 'U': return Math.round(d.getTime()/100);
				default: return '';
			}
		}
	);
}

d = new Date();
print(date(d,'M/d/Y h:i:s (U)'))
print(date(d,'r (c)'))
print(date(d,'\\B@B'));
