/**
 * Created by coco on 17-7-19.
 */
'use strict';
const readline = require('readline-sync');
let STU = [];
//let mid = 0;
//let ave = 0;
class Stu{
    constructor(name,id,eth,klass){
        this.name = name;
        this.id = id;
        this.eth = eth;
        this.klass = klass;
        this.grade = {chin:0.0,math:0.0,eng:0.0,code:0.0};
        this.ave = 0;
        this.totall = 0;
    }
    setGrade(stuGrade)
    {
        this.grade.chin = stuGrade[0];
        this.grade.math = stuGrade[1];
        this.grade.eng = stuGrade[2];
        this.grade.code = stuGrade[3];
        this.totall = (this.grade.chin+this.grade.math+this.grade.eng+this.grade.code).toFixed(2);
        this.ave = (this.totall/4).toFixed(2);
    }
}
const Stub = {
    getInputStu : function () {
        let inPut = readline.question(`请输入学生信息
     姓名 学号 民族 班级
例如：可可 2015211007 汉族 1503
：`);
        let reg = /^[\u4e00-\u9fa5]{2,}\s\d{10}\s[\u4e00-\u9fa5]{2,}\s\d*$/;
        if(reg.test(inPut))
        {
            return inPut;
        }
        else
        {
            console.log(`-----------------------------
|格式输入不正确，请按照格式输入|
-----------------------------`);
            Stub.getInputStu();
        }

    },
    getInputGrade : function () {
        let inPut = readline.question(`请输入学生的成绩
 语文 数学 英语 编程
：`);
        let reg = /^\d+(\.\d+)?\s\d+(\.\d+)?\s\d+(\.\d+)?\s\d+(\.\d+)?$/;
        if(reg.test(inPut))
        {
            return inPut;
        }
        else
        {
            console.log(`
-----------------------------
|格式输入不正确，请按照格式输入|
-----------------------------`);
            Stub.getInputGrade();
        }
    },
    getFuncNum : function () {
        let num = readline.question(`1、添加学生
2、生成成绩单
3、退出
请输入你的选择（1～3）：
`);
        let reg = /^[0-3]$/;
        if(reg.test(num))
        {
            return parseInt(num);
        }
        else
        {
            console.log(`
-----------------
|输入内容格式错误|
-----------------`);
            return -1;
        }
    },
    getInputId :function () {
        let num = readline.question(`请输入学号（例如：2015211007 ...）
：`);
        let reg = /^(\d{10}\s)*\d{10}$/;
        if(reg.test(num))
        {
            return num;
        }
        else
        {
            console.log(`请按照格式输入
：`);
            Stub.getInputId();
        }
    },
    printt: function(STU) {
        if(STU.length === 0)
        {
            console.log(`
 ----------------------------
|学生数量为0,请先插入学生信息。|
 ----------------------------`);
        }
        else
        {
            let num = Stub.getInputId();
            let stuNum = num.split(' ');
            let stuNeedOutput = [];
            /*
            for(let i = 0;i<stuNum.length;i++)
            {
                stuInputId[i] = parseInt(stuNum[i]);
            }*/
            for(let i = 0;i<stuNum.length;i++)
            {
                for(let j = 0;i<STU.length;j++)
                {
                    if(STU[j].id === stuNum[i])
                    {
                        stuNeedOutput[i]=STU[j];
                        break;
                    }
                    if(j===STU.length-1 && STU[j] != stuNum[i])
                    {
                        console.log(`学号:${stuNum}不存在，请重新输入
：`);
                        Stub.printt(STU);
                    }
                }
            }
            let str = `成绩单
`;
            str+=`姓名|数学|语文|英语|编程|平均分|总分
=======================================
`;
            for(let i = 0;i<stuNeedOutput.length;i++)
            {
                str += `${stuNeedOutput[i].name}|${stuNeedOutput[i].grade.math}|${stuNeedOutput[i].grade.chin}|${stuNeedOutput[i].grade.eng}|${stuNeedOutput[i].grade.code}|${stuNeedOutput[i].ave}|${stuNeedOutput[i].totall}
`;
            }
            str +=`=======================================
全班分数的中位数:${midd(STU)}
全班分数的平均数:${aver(STU)}
`;
            return str;
        }
    },
    threeFunc : function() {
        let num = Stub.getFuncNum();
        switch(num)
        {
            case -1: Stub.threeFunc();break;
            case 1: STU.push(addStu()); Stub.threeFunc();break;
            case 2: console.log(Stub.printt(STU));Stub.threeFunc();break;
            case 3: break;
        }
    }
};
function addStu() {
    let getStuIfo = Stub.getInputStu();
    let getStuGrade = Stub.getInputGrade();
    let stuIfo = getStuIfo.split(' ');
    let stuGrade = getStuGrade.split(' ');
    //let stuIfo = Stub.getInputStu().split(' ');
    //let stuGrade = Stub.getInputGrade().split(' ');
    let stuScore = [];
    for(let i = 0;i<stuGrade.length;i++)
    {
        stuScore[i] = parseFloat(stuGrade[i]);
    }
    let STUDENT = new Stu(stuIfo[0],stuIfo[1],stuIfo[2],stuIfo[3]);
    STUDENT.setGrade(stuScore);
    return STUDENT;
}
function aver(STU) {
    let ave = 0;
    for(let i=0;i<STU.length;i++)
    {
        ave += STU[i].totall;
    }
    ave = (ave/STU.length).toFixed(2);
    console.log(ave);
    return ave;
}
function midd(STU) {
    let mid = 0;
    let score = [];
    for(let i = 0;i<STU.length;i++)
    {
        score[i] = STU[i].totall;
    }
    score.sort(function (a,b) {
        return a-b;
    });
    if(score.length%2===0)
        mid = ((score[score.length/2-1]+score[score.length/2])/2).toFixed(2);
    else
        mid = (score[parseInt(score.length/2)]);
    return mid;
}


Stub.threeFunc();
//module.exports.midd = midd;
module.exports.Stub = Stub;
//module.exports.aver = aver;
module.exports.STU = STU;
module.exports.addStu = addStu;
//module.exports.count = count;

