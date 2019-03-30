# nmb-empty-control
Thanks to Pure JavaScript, it allows you to control your free space in HTML inputs very quickly.

## Preview

![nmb-empty-control-preview](https://github.com/NazimMertBilgi/nmb-empty-control/blob/master/docs/images/preview-nmb-empty-control.PNG)

## Demo
You can test it live from **[this link](https://nazimmertbilgi.github.io/nmb-empty-control/)**.

## Get Started Now
```
<textarea required-ec="warning" minlength-ec="10" maxlength-hard-ec="20"></textarea>

<link rel="stylesheet" type="text/css" href="empty.control.css">
<script src="empty.control.min.js"></script>

<script>
   emptycontrol.fire();
</script>
```
Write down the codes and see what's going on.

## Wiki
To be able to use it efficiently, please go to the Wiki page. "nmb-empty-control" will meet your requirements in field control. **[Wiki](https://github.com/NazimMertBilgi/nmb-empty-control/wiki)**

## Languages
Currently, there are 4 language support available. English, Turkish, German and Russian.

## Optional Configurations
You can find configurations inside the html page.

|Key|Description|Value Type|Default|
|--|--|--|--|
|languageCode|Language Code. **[wiki](https://github.com/NazimMertBilgi/nmb-empty-control/wiki/Language-Select,-Change)**|`string`|`en`|
|selector|DOM selector. **[wiki](https://github.com/NazimMertBilgi/nmb-empty-control/wiki/Selector-Change)**|`string`|`input[required-ec],textarea[required-ec]`|
|dependentButton|Button controller. **[wiki](https://github.com/NazimMertBilgi/nmb-empty-control/wiki/Dependent-Button-Change)**|`string`|`#finish`


## Contribution
Contribution are always **welcome and recommended!** Here is how:
- Fork the repository [(here is the guide).](https://help.github.com/articles/fork-a-repo/)
- Clone to your machine.
```
git clone https://github.com/YOUR_USERNAME/nmb-empty-control.git
```
- Make your changes.
- Create a pull request.

## License
**nmb-empty-control** is an open source project that is licensed under the [MIT license](http://opensource.org/licenses/MIT).

