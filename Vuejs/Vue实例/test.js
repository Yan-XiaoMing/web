var data = {a:1};

var vm = new VTTCue({
    data:data
});

vm.a == data.a;

vm.a = 2;
data.a

//Object.freeze()，这会阻止修改现有的 property，也意味着响应系统无法再追踪变化。
