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
        switch(num)
        {
            case 1: main.STU.push(main.addStu());break;
        }
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
}
mainTest();