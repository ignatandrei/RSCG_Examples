# Biwen.AutoClassGen

#### Usage scenario

- In many cases, we will have a lot of request objects,
such as GetIdRequest, GetUserRequest, etc..., and these requests may have a large number of the same fields.
For example, the multi-tenant Id, the number of pages, and these attribute fields may have validation rules, binding rules, and Swagger descriptions.
If all this code needs to be written, it will add a lot of work, so Biwen.AutoClassGen came into being to solve this pain point...
- In many cases, we will have a lot of DTO objects,
- AOP & Decorator



[中文](https://github.com/vipwan/Biwen.AutoClassGen/blob/master/README-zh.md)

### Usage

```bash
dotnet add package Biwen.AutoClassGen.Attributes
```

- [Gen DTO Usage doc](https://github.com/vipwan/Biwen.AutoClassGen/blob/master/Gen-Dto.md)
- [Gen Request Usage doc](https://github.com/vipwan/Biwen.AutoClassGen/blob/master/Gen-request.md)
- [Gen Decoration Usage doc](https://github.com/vipwan/Biwen.AutoClassGen/blob/master/Gen-Decor.md)

### Used by
#### if you use this library, please tell me, I will add your project here.
- [Biwen.QuickApi](https://github.com/vipwan/Biwen.QuickApi)
