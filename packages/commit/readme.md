
## 快速上手

### 1. 安装相关依赖包

> cnpm i commitizen @nicecode/commit --save-dev

### 2. 在 package.json 中加入以下内容

```json
{
  ...
  "config": {
    "commitizen": {
      "path": "@nicecode/commit"
    }
  },
}
```

### 3. 在 package.json 中创建以下 script 命令

```json
{
  "cz": "git add . && git cz"
}
```

### 4. 运行命令

```
npm run cz
```

## join us

[Nicecoders Team](https://github.com/nicecoders/nicecode)
