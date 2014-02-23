This small library allows you to use PHP date() format strings in JavaScript cleanly.

My use case was so that the user configured date format in Tinyboard would be shared by JavaScript components of the same. 

Usage example (assuming JavaScript-C as the interpreter):

    d = new Date(2014, 0, 21, 2, 3, 4);
    print(date_format(d,'M/d/Y h:i:s (U)'))
    print(date_format(d,'r'));
