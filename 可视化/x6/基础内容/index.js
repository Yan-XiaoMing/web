const { Graph, Shape } = X6


const data = {
    // 节点
    nodes: [
        {
            id: 'node1', // String，可选，节点的唯一标识
            x: 40,       // Number，必选，节点位置的 x 值
            y: 40,       // Number，必选，节点位置的 y 值
            width: 80,   // Number，可选，节点大小的 width 值
            height: 40,  // Number，可选，节点大小的 height 值
            label: 'hello', // String，节点标签
        },
        {
            id: 'node2', // String，节点的唯一标识
            x: 160,      // Number，必选，节点位置的 x 值
            y: 180,      // Number，必选，节点位置的 y 值
            width: 80,   // Number，可选，节点大小的 width 值
            height: 40,  // Number，可选，节点大小的 height 值
            label: 'world', // String，节点标签
        },
    ],
    // 边
    edges: [
        {
            source: 'node1', // String，必须，起始节点 id
            target: 'node2', // String，必须，目标节点 id
        },
    ],
};


const graph = new Graph({
    container: document.getElementById('container'),
    grid: {
        visible: true,
    },
    connecting:{
        anchor: 'topLeft',
        snap:{
            radius:50
        },
        allowBlank:false,
        allowEdge:false,
        allowNode:false,
        anchor:'midSide',
        createEdge(){
            return new Shape.Edge({
                router:{
                    name:'manhattan'
                }
            })
        },
        connectionPoint:{
            name: 'boundary',
            args:{
                sticky:true
            }
        }
    },
    
});
// graph.fromJSON(data)

const startRect = new Shape.Rect({
    id:'start',
    x:30,
    y:30,
    width:150,
    height:70,
    label:'起点',
    ports: {
        groups: {
          in: {
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              },
            },
            position: 'top',
          },
          out: {
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              },
            },
            position: 'bottom',
          },
        },
        items: [
          {
            id: 'port1',
            group: 'in',
          },
          {
            id: 'port2',
            group: 'in',
          },
          {
            id: 'port3',
            group: 'in',
          },
          {
            id: 'port4',
            group: 'out',
          },
          {
            id: 'port5',
            group: 'out',
          },
        ],
      },
})

const centerRect = new Shape.Rect({
    id:'center',
    x:300,
    y:300,
    width:150,
    height:70,
    label:'中心',
    ports:{
        groups:{
            in:{
                position:'absolute',
                attrs:{
                    circle:{
                        r:0.3,
                        magnet:true,
                        stroke:'#000',
                        strokeWidth:2,
                        fill:'#000'
                    }
                }
            }
        },
        items:[
            {
                id:'endport1',
                group:'in',
                args:{
                    x:'0',
                    y:0
                }
            },
            // {
            //     id:'port2',
            //     group:'in',
            //     args: { x: '85%', y: '110%' },
            // },
            // {
            //     id:'port3',
            //     group:'in',
            //     args:{
            //         x:0,
            //         y:'25%'
            //     }
            // },
            // {
            //     id:'port4',
            //     group:'in',
            //     args:{
            //         x:0,
            //         y:'75%'
            //     }
            // },
        ]
    }
})
graph.addNode(startRect)
graph.addNode(centerRect)

// const rect = new Shape.Rect({
//     id: 'node3',
//     x: 100,
//     y: 100,
//     width: 100,
//     height: 40,
//     label: 'rect',
//     zIndex: 2,
// })
// const rect = new Shape.Rect({
//     x: 100,
//     y: 200,
//     width: 80,
//     height: 40,
//     angle: 30,
//     attrs: {
//         body: {
//             fill: 'blue'
//         },
//         label: {
//             text: 'Hello',
//             fill: 'white'
//         }
//     }
// })

// const helloRect = new Shape.Rect({
//     x: 180,
//     y: 30,
//     width: 80,
//     height: 40,
//     label: 'hello'
// })

// const worldRect = new Shape.Rect({
//     x: 180,
//     y: 200,
//     width: 80,
//     height: 40,
//     label: 'world'
// })

// const circle = new Shape.Circle({
//     id: 'node4',
//     x: 280,
//     y: 200,
//     width: 60,
//     height: 60,
//     label: 'circle',
//     zIndex: 2,
// })

// // console.log(Shape)

// const edge = new Shape.Edge({
//     source: { cell: rect, port: 'out-port-1' },
//     target: { cell: circle, port: 'in-port-1' },
//     zIndex: 1,
// })
// console.log(edge)
// graph.addNode(rect)
// graph.addNode(circle)
// graph.addNode(helloRect)
// graph.addNode(worldRect)
// graph.addEdge({
//     source: helloRect,
//     target: worldRect,
//     vertices: [
//         { x: 100, y: 200 },
//         { x: 300, y: 120 },
//     ],
//     router: {
//         name: 'orth',
//         args: {},
//     },
//     connector:{
//         name:'rounded',
//         args:{}
//     }
// })
// graph.addEdge(edge)