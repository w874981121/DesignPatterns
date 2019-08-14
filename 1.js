/*
 * @Author: 咸鱼
 * @Date: 2019-08-13 00:01:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-08-15 02:32:51
 * @Description: 【创建型设计模式】
 */
/* 简单工厂模式
  <--------------------------简单工厂模式start----------------------------->
 */
//创建对象，拓展对象属性和方法
const SimpleFactory = function (name, type) {
    const o = new Object();
    o.name = name;
    o.type = type;
    o.FnShow = function () {
        //对象功能方法
        console.log(this.name)
        console.log(this.type)
    }
    return o;
};
// 通过工厂创建一个对象
const bx = SimpleFactory("AB", "1");
//<--------------------------简单工厂模式end-----------------------------> 

// 2、工厂方法模式
//  <--------------------------工厂方法模式start-----------------------------> 
// 工厂内置N中类型方法
const Factory = function (type, content) {
    // 安全模式：
    // 检测this是否属于Factory函数，不属于则创建，属于则调用对应方法
    // 同事兼容了使用new关键字和未使用new关键字的调用方式
    if (this instanceof Factory) {
        const s = new this[type](content);
        return s
    } else {
        return new Factory(type, content)
    }
}
// 原型中设置数据基类
Factory.prototype = {
    Css: function (content) {
        console.log("css:", content)
    },
    JavaScript: function (content) {
        console.log("javascript:", content)
    }
}
// 通过工厂调用设置好的方法输出
const h = new Factory("JavaScript", "6666666666");
//  <--------------------------工厂方法模式end-----------------------------> 

// 抽象工厂模式
//  <--------------------------抽象工厂模式start-----------------------------> 
const VehicleFactory = function (subType, superType) {
    // 验证工厂中是否存在该类生产方案
    if (typeof VehicleFactory[superType] === "function") {
        function F() { };    //初始化一条生产线
        F.prototype = new VehicleFactory[superType]();  //把对应生产方案放在该条生产线上
        subType.constructor = subType;    //打上标签该线生产某种产品
        subType.prototype = new F();      //提交生产方案，下放到具体生产
        return subType
    } else {
        throw new error("未创建该抽象类")
    }
}
// （工厂中的小汽车类生产方案）
VehicleFactory.Car = function () {
    this.type = "car"
}
VehicleFactory.Car.prototype = {
    getPrice: function () {
        return new Error("抽象方法不能调用")
    },
    getSpeed: function () {
        return new Error("抽象方法不能调用")
    }
}
// （工厂中的公交车生产线方案）
VehicleFactory.Bus = function () {
    this.type = "bus"
}
VehicleFactory.Bus.prototype = {
    getPrice: function () {
        return new Error("抽象方法不能调用")
    },
    getSpeed: function () {
        return new Error("抽象方法不能调用")
    }
}
// 使用
// 创建一条宝马生产线  需要输入生产宝马的属性，才能生产对应的宝马
const BMW = function (Price, Speed) {
    this.Price = Price;
    this.Speed = Speed;
}
VehicleFactory(BMW, "Car");  //继承已存在的生产方案
BMW.prototype.getPrice = function () {   //添加需要的功能设备
    return this.Price;
}
BMW.prototype.getSpeed = function () {
    return this.Speed;
}

// 宇通
const YUTONG = function (Price, Speed) {
    this.Price = Price;
    this.Speed = Speed;
}
VehicleFactory(YUTONG, "Bus");
// 输出测试
const bm1 = new BMW("800,000", 300);  //生产了一台80W的，速度为300km/h的宝马车，产自 Car 生产线
console.log(bm1.getPrice());
console.log(bm1.getSpeed());
console.log(bm1.type);
const yt1 = new YUTONG("2000,000", 240);
console.log(yt1.getPrice());
console.log(yt1.getSpeed());
console.log(yt1.type);
//  <--------------------------抽象工厂模式end-----------------------------> 

// 建造者模式
//  <--------------------------建造者模式start-----------------------------> 
// 局部建造实例对象，最后统一为一个对象。 （对象粒度小或者模块复用率低，最好还是整体建造对象。）
// 创建一个人
const Humen = function (param) {
    this.skill = param && param.skill || "保密";
    this.hobby = param && param.hobby || "保密";
}
Humen.prototype = {
    getSkill: function () {
        return this.skill;
    },
    getHobby: function () {
        return this.hobby;
    }
}
// 实例化姓名类
const Name = function (name) {
    this.name = name
}
// 实例化职业类
const Work = function (work) {
    const _this = this;
    (function (work, _this) {
        switch (work) {
            case 'code':
                _this.work = "工程师";
                _this.workDescript = "每天沉浸在写BUG中"
                break;
            case 'UI':
                _this.work = "视觉设计师";
                _this.workDescript = "每天沉浸在抠图中"
                break;
            case 'UE':
                _this.work = "交互设计师";
                _this.workDescript = "每天都在设计反人类操作"
                break;
            case 'teach':
                _this.work = "老师";
                _this.workDescript = "分享也是一种快乐"
                break;
            default:
                _this.work = work;
                _this.workDescript = "对不起我们不清楚您的职位相关描述"
                break;
        }
    })(work, _this)
}
// 修改职业
Work.prototype.changeWork = function (work) {
    this.work = work;
}
// 修改或添加职业描述
Work.prototype.changeDescript = function (sentence) {
    this.workDescript = sentence;
}

const Person = function (name, work) {
    //对象局部创建对象；   
    let _person = new Humen();      //初始化一个人
    _person.name = new Name(name);  //  挂载实例名字
    _person.work = new Work(work);   // 挂载实例职业
    return _person;
}
// 使用
const person = new Person("咸鱼", 'code');
console.log(person)
console.log(person.skill)
console.log(person.hobby)
console.log(person.name)
console.log(person.work.workDescript)
person.work.changeDescript("修改描述");  //修改子类

//  <--------------------------建造者模式end-----------------------------> 

// 原型模式
//  <--------------------------原型模式start-----------------------------> 
// （1）
const LoopImages = function (imgArr, container) {
    this.imagesArray = imgArr;
    this.container = container;
}
LoopImages.prototype = {
    createImage: function () {
        console.log("创建轮播图")
    },
    changeImage: function () {
        console.log("切换下一张")
    }
}
// 左右切换
const SlideLoopImg = function (imgArr, container) {
    LoopImages.call(this, imgArr, container)
}
SlideLoopImg.prototype = new LoopImages();
SlideLoopImg.prototype.changeImage = function () {
    console.log("SlideLoopImg    function")
}

// 渐隐切换
const FadeLoopImg = function (imgArr, container, arrow) {
    LoopImages.call(this, imgArr, container, arrow)
    this.arrow = arrow;
}
FadeLoopImg.prototype = new LoopImages();
FadeLoopImg.prototype.changeImage = function () {
    console.log("FadeLoopImg    function")
}

const LopImg = new LoopImages([2, 3, 4], "1", [7, 9])
LopImg.changeImage();
console.log(LopImg)
const SdImg = new SlideLoopImg([2, 3, 4], "1", [7, 9])
SdImg.changeImage();
console.log(SdImg)
const FaImg = new FadeLoopImg([2, 3, 4], "1", [7, 9])
FaImg.changeImage();
console.log(FaImg)

//  扩展： 对基类进行复制创建
function protoTypeExtend() {   //浅拷贝
    const F = function (){},  
        args = arguments,
        len = args.length;
    for (let i = 0; i < len; i++) {
        for (let j in args[i]) {
            F.prototype[j] = args[i][j]
        }
    }
    return new F();
}

const penguin = protoTypeExtend({
    speed: 20,
    swim: function () {
        console.log("游泳速度" + this.speed);
    }
}, {
    run: function (speed) {
        console.log("奔跑", speed);
    }
}, {
    jump: function () {
        console.log("跳跃");
    }
})

penguin.swim()
penguin.run(9999)
penguin.jump()


//  <--------------------------原型模式end-----------------------------> 

// 单例模式
//  <--------------------------单例模式start-----------------------------> 


//  <--------------------------单例模式end-----------------------------> 

