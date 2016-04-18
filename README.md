# SearchDirContent

a node.js tool for searching keyword in a certain directory recursively

遍历文件夹中的文本文件，快速定位关键词

[中文切换](./README_zh.md)

## How to Use

- Step 1

``` npm install -g node-search-file ```

-Step 2

open your terminal tool like cmd, PowerShell, Git Bash, etc.

-Step 3

change your current working directory where to do to your content-searching job;

-Step 4

``` search ${dir_to_deep_into}  ${your_key_word} ${ignore_case} ```

- Lastly

wait a while...

now you will see contents matched are all printed on your terminal... just like: 

```
	[dir]: ./lib
	[---]: ./lib/index.js
```

good luck...


## Todos

- path is not formatted yet

- regular expression is not supported yet

- return all matched files/dirs in Array pattern

- can we find the exact line number?

- reconstruct code

- tests

