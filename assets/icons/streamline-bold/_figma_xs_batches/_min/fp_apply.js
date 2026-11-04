const page=figma.root.children.find(p=>/Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const collections=await figma.variables.getLocalVariableCollectionsAsync();
let iconDefault=null;
for(const coll of collections){for(const id of coll.variableIds){const v=await figma.variables.getVariableByIdAsync(id);if(v&&v.name==='icon/default')iconDefault=v;}}
function bindFills(root){const stack=[root];while(stack.length){const n=stack.pop();if('constraints'in n)n.constraints={horizontal:'SCALE',vertical:'SCALE'};if(n.type==='VECTOR'||n.type==='BOOLEAN_OPERATION'||n.type==='ELLIPSE'||n.type==='STAR'||n.type==='POLYGON'){const paint=figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',iconDefault);n.fills=[paint];n.strokes=[];}if('children'in n)for(const c of n.children)stack.push(c);}}
const svg=atob([0,1,2,3].map(i=>figma.root.getPluginData('sb_fp_'+i)).join(''));
const set=page.findOne(n=>n.type==='COMPONENT_SET'&&n.name==='icon/misc/fingerprint');
if(!set) return {ok:0,missing:1,failed:0,miss:['icon/misc/fingerprint'],fail:[]};
const xs=set.children.find(c=>c.name==='Size=xs');
const md=set.children.find(c=>c.name==='Size=md');
if(!xs) return {ok:0,missing:0,failed:1,miss:[],fail:[{name:'icon/misc/fingerprint',reason:'no-xs'}]};
xs.visible=true;for(const c of[...xs.children])c.remove();
const node=figma.createNodeFromSvg(svg);node.name='fingerprint';node.resize(16,16);node.x=0;node.y=0;node.clipsContent=false;
if('constraints'in node)node.constraints={horizontal:'SCALE',vertical:'SCALE'};
xs.appendChild(node);try{xs.resizeWithoutConstraints(16,16);}catch(_){try{xs.resize(16,16);}catch(__){}}
bindFills(node);xs.clipsContent=false;xs.visible=false;if(md)md.visible=true;
try{set.resizeWithoutConstraints(24,24);}catch(_){}set.clipsContent=true;
for(const i of[0,1,2,3]) figma.root.setPluginData('sb_fp_'+i,'');
return {ok:1,missing:0,failed:0,miss:[],fail:[]};
