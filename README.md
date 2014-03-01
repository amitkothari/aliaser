# Aliaser

Aliaser is a CLI tool to manage aliases for commands in Mac OS X.

**Please note - Aliaser is a work in progress and may have issues.**

[![NPM](https://nodei.co/npm/aliaser.png?downloads=true&starts=true)](https://nodei.co/npm/aliaser/)

## Usage

**Add new alias**

```
aliaser add <alias> <command>
aliaser add start-server '/opt/server/bin/start.sh -c dev -p 3000 -b 0.0.0.0'
```

**Remove alias**

```
aliaser remove <alias>
aliaser remove start-server
```
**List aliases**

```
aliaser list
```

All aliases add using aliaser are stored in aliaser.zsh file under oh-my-zsh lib directory.

## Limitation

* Only works with [Z shell](http://www.zsh.org/).
* Need [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) installed.

## License

Licensed under the [MIT License](http://opensource.org/licenses/MIT)
