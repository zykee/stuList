/**
 * Created by coco on 17-7-19.
 */
const main = require('./main');
const sinon = require('sinon');
function mainTest() {
    let stuIfo = sinon.stub(main.Stub,'getInputStu').callsFake(function () {
        return `郑永可 2015211007 汉族 1503`;
    });
    let stuGrade = sinon.stub(main.Stub,'getInputGrade').callsFake(function () {
        return '99 89 98 99';
    });
    let inputNum = sinon.stub(main.Stub,'getFuncNum').callsFake(function () {
        return 1;
    });
    let threeFunc = sinon.stub(main.Stub,'threeFunc').callsFake(function () {
        let num = main.Stub.getFuncNum();
        console.log(num);
        switch(num)
        {
            case 1: main.STU[main.count]=main.addStu();console.log(num);main.count++;console.log(num);console.log(main.count);break;
        }
    });
    let printt = sinon.stub(main.Stub,'printff').callsFake(function (STU) {
        let str = `成绩单
`;
        str+=`姓名|数学|语文|英语|编程|平均分|总分
=======================================
`;
        for(let i = 0;i<STU.length;i++)
        {
            str += `${STU[i].name}|${STU[i].grade.math}|${STU[i].grade.chin}|${STU[i].grade.eng}|${STU[i].grade.code}|${STU[i].ave}|${STU[i].totall}
`;
        }
        str +=`=======================================
全班分数的中位数:${main.midd(STU)}
全班分数的平均数:${main.aver(STU)}
`;
        return str;
    });
    let expectStr = `成绩单
姓名|数学|语文|英语|编程|平均分|总分
=======================================
郑永可|89|99|98|99|96.25|385.00
=======================================
全班分数的中位数:385.00
全班分数的平均数:385.00

`;
    main.Stub.threeFunc();
    console.log(main.count);
    console.log(main.STU);
    if(expectStr === main.Stub.printt(main.STU)){
        console.log(`test pass`);
    }
    else
    {
        console.log(`test failed`);
    }
    stuGrade.restore();
    stuIfo.restore();
    inputNum.restore();
    threeFunc.restore();
    printt.restore();
}
mainTest();