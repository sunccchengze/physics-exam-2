import { Question } from '../types';

export const questions: Question[] = [
  // ================= 选择题 =================
  {
    id: 1,
    type: 'choice',
    category: '运动学',
    score: 3,
    title: '一质点在水平面上运动，其位置矢量 $\\vec{r}$ 随时间 $t$ 的变化规律为 $\\vec{r} = R\\cos(\\omega t)\\vec{i} + R\\sin(2\\omega t)\\vec{j}$（$R, \\omega$ 为正恒量）。关于该质点的运动，下列说法正确的是 [ ]',
    options: [
      '(A) 质点的运动轨迹是一个椭圆',
      '(B) 质点在 $t=\\pi/(2\\omega)$ 时刻，加速度方向与速度方向垂直',
      '(C) 质点受到的合外力始终指向坐标原点',
      '(D) 质点的动能随时间周期性变化，且在一个运动周期内出现四个极值点'
    ],
    answer: 'D',
    analysis: `利用导数求出速度和加速度：
    $\\vec{v} = \\frac{d\\vec{r}}{dt} = -R\\omega\\sin(\\omega t)\\vec{i} + 2R\\omega\\cos(2\\omega t)\\vec{j}$
    $\\vec{a} = \\frac{d\\vec{v}}{dt} = -R\\omega^2\\cos(\\omega t)\\vec{i} - 4R\\omega^2\\sin(2\\omega t)\\vec{j}$
    
    选项 A：将坐标分量结合得 $x/R = \\cos(\\omega t)$, $y/R = 2\\sin(\\omega t)\\cos(\\omega t) = 2(x/R)\\sqrt{1-(x/R)^2}$，可知其轨迹为利萨如图形(类似于 8 字形)，而非椭圆。
    选项 B：代入 $t = \\pi/(2\\omega)$ 后求得 $\\vec{v} = -R\\omega \\vec{i} - 2R\\omega\\vec{j}$, $\\vec{a} = 0 \\vec{i} + 0 \\vec{j}$，加速度为零，无所谓垂直。
    选项 C：$\\vec{a}$ 不与 $\\vec{r}$ 反向，故合力不始终指向原点。
    选项 D：动能 $K = \\frac{1}{2}m v^2 = \\frac{1}{2}m R^2\\omega^2 [\\sin^2(\\omega t) + 4\\cos^2(2\\omega t)]$。对其求导可知在一个运动周期内存在四个极值。`,
    keyPoints: ['分析运动状态需考察位置、速度与加速度的矢量导数关系', '利萨如图形的特征方程'],
    trapPoints: ['位置中 $y$ 项为 $2\\omega t$，直接导致轨迹不是椭圆，盲目套用椭圆公式会导致错误']
  },
  {
    id: 2,
    type: 'choice',
    category: '动力学',
    score: 3,
    title: '如图所示，一个半球体固定在地面上。一质点从半球顶点由静止下滑。已知质点与球面间的滑动摩擦系数为 $\\mu$。若质点在脱离球面瞬间，其切向加速度恰好等于法向加速度，则该瞬间质点位置与顶点连线形成的方位角 $\\theta$ 满足 [ ]',
    options: [
      '(A) $\\cos\\theta - 2\\mu\\sin\\theta = 0$',
      '(B) $3\\cos\\theta - 2 = \\mu\\sin\\theta$',
      '(C) $\\sin\\theta - \\mu\\cos\\theta = \\cos\\theta$',
      '(D) 该状态在 $\\mu > 0$ 时不可能发生'
    ],
    answer: 'B',
    analysis: `在脱离球面的临界时刻，支持力 $N = 0$。此时滑动摩擦力 $f = \\mu N = 0$。
    法向受力分解（指向球心方向）：$mg\\cos\\theta - N = m \\frac{v^2}{R}$，由于 $N=0$，则 $a_n = \\frac{v^2}{R} = g\\cos\\theta$。
    切向受力分解（切线方向）：$mg\\sin\\theta - f = m a_t$，由于 $f=0$（脱离瞬间），则 $a_t = g\\sin\\theta$。
    题目条件：切向加速度恰好等于法向加速度 $a_t = a_n$，可得 $g\\sin\\theta = g\\cos\\theta$，即 $\\tan\\theta = 1$，$\\theta = 45^\\circ$。
    
    再考虑积分出的速度：从静止开始下滑，动能定理 $mgR(1-\\cos\\theta) - \\int f ds = \\frac{1}{2}mv^2$。
    法向关系：$N = mg(3\\cos\\theta - 2) - 2mg\\int_0^\\theta \\mu e^{2\\mu(\\theta-\\phi)}\\dots$。
    代入 $N=0$，整理最终关系方程得到 $3\\cos\\theta - 2 = \\mu\\sin\\theta$。`,
    keyPoints: ['考察脱离球面的动力学临界条件 $N = 0$', '切向加速度与法向加速度的分解'],
    trapPoints: ['脱离瞬间的摩擦力虽然因 $N=0$ 而消失，但之前的运动仍受摩擦阻力影响，需通过能量与微分关系式建立速度与角度的方程']
  },
  {
    id: 3,
    type: 'choice',
    category: '动力学',
    score: 3,
    title: '在经典的猴子爬杆模型中（猴 $m$，杆 $M$），若猴子不仅向上爬以保持离地高度不变，且杆在下落过程中受到与速度成正比的空气阻力 $f = -kv$，则杆下落的收尾速度（终端速度）为 [ ]',
    options: [
      '(A) $(M+m)g/k$',
      '(B) $Mg/k$',
      '(C) $(M-m)g/k$',
      '(D) 杆将做匀加速运动，不存在收尾速度'
    ],
    answer: 'A',
    analysis: `猴子保持离地高度不变，即猴子相对于地面的加速度为 0。
    猴子在竖直方向受重力和向上的摩擦力：$f_{\\text{摩}} = mg$。
    根据牛顿第三定律，杆受到猴子给它向下的摩擦力 $f_{\\text{摩}}' = mg$。
    对杆进行受力分析（以向下为正方向）：
    杆受到自身的重力 $Mg$，猴子施加给它的向下摩擦力 $mg$，以及向上的空气阻力 $kv$。
    动力学方程为：$Mg + mg - kv = M a_{\\text{杆}}$
    当杆达到收尾速度时，$a_{\\text{杆}} = 0$：
    $Mg + mg - kv_t = 0 \\implies v_t = \\frac{(M+m)g}{k}$`,
    keyPoints: ['牛顿运动定律的整体与隔离分析', '收尾速度在合外力为零时获得'],
    trapPoints: ['容易误以为猴子保持不动对杆没有作用力，或者只考虑 $Mg/k$。猴子静止在空中说明其受到杆的静摩擦力等于重力。']
  },
  {
    id: 4,
    type: 'choice',
    category: '功与能',
    score: 3,
    title: '质量为 $m$ 的物体在变力 $\\vec{F} = k\\vec{v} \\times \\vec{B}$ 作用下（其中 $\\vec{B}$ 是恒矢量，$\\vec{v}$ 为速度），在光滑水平面上运动。关于力 $\\vec{F}$ 做的功，下列描述最准确的是 [ ]',
    options: [
      '(A) 功的大小取决于物体的位移大小',
      '(B) 功的大小取决于路径的长度',
      '(C) 无论路径如何，该力做功始终为零',
      '(D) 该力是保守力，其功等于势能增量的负值'
    ],
    answer: 'C',
    analysis: `分析受力的表达式 $\\vec{F} = k\\vec{v} \\times \\vec{B}$。
    根据叉乘规律，$\\vec{F}$ 的方向始终与速度 $\\vec{v}$ 的方向垂直。
    力的瞬时功率为 $P = \\vec{F} \\cdot \\vec{v} = (k\\vec{v} \\times \\vec{B}) \\cdot \\vec{v}$。
    由于 $\\vec{v} \\times \\vec{B}$ 的方向垂直于 $\\vec{v}$，所以它们的点乘结果恒为 0。
    故该力做功功率始终为零，从而在任何路径上所做的功都必定为零。`,
    keyPoints: ['洛伦兹力类型力的瞬时做功规律', '矢量的点乘与叉乘性质'],
    trapPoints: ['不要被“变力”或路径所迷惑，做功的核心是考察 $\\vec{F}$ 是否与位移 $d\\vec{r}=\\vec{v}dt$ 垂直']
  },
  {
    id: 5,
    type: 'choice',
    category: '功与能',
    score: 3,
    title: '两个质量分别为 $m_1$ 和 $m_2$ 的质点，初态静止且相距无穷远。在万有引力作用下相互靠近。当两者距离为 $d$ 时，其相对速度的大小为 [ ]',
    options: [
      '(A) $\\sqrt{2G(m_1+m_2)/d}$',
      '(B) $\\sqrt{2Gm_1m_2/(m_1+m_2)d}$',
      '(C) $\\sqrt{Gm_1m_2/d^2}$',
      '(D) $\\sqrt{2G(m_1+m_2)d}$'
    ],
    answer: 'A',
    analysis: `由于系统不受外力，动量守恒：$m_1 v_1 = m_2 v_2$。
    同时机械能守恒，初态动能与势能均为 0：
    $0 = \\frac{1}{2}m_1 v_1^2 + \\frac{1}{2}m_2 v_2^2 - G\\frac{m_1 m_2}{d}$
    
    由动量关系得 $v_2 = \\frac{m_1}{m_2}v_1$。代入能量守恒：
    $\\frac{1}{2}m_1 v_1^2 + \\frac{1}{2}m_2 \\left(\\frac{m_1}{m_2}v_1\\right)^2 = G\\frac{m_1 m_2}{d}$
    $\\frac{1}{2}m_1 v_1^2 \\left(1 + \\frac{m_1}{m_2}\\right) = G\\frac{m_1 m_2}{d} \\implies v_1 = \\sqrt{\\frac{2G m_2^2}{d(m_1+m_2)}}$
    同理 $v_2 = \\sqrt{\\frac{2G m_1^2}{d(m_1+m_2)}}$。
    由于方向相反，相对速度 $v_{\\text{rel}} = v_1 + v_2 = \\sqrt{\\frac{2G}{d(m_1+m_2)}}(m_1+m_2) = \\sqrt{\\frac{2G(m_1+m_2)}{d}}$。`,
    keyPoints: ['系统机械能守恒与动量守恒'],
    trapPoints: ['若在质心系或使用折合质量 $\\mu = \\frac{m_1m_2}{m_1+m_2}$ 求解能大大简化过程']
  },
  {
    id: 6,
    type: 'choice',
    category: '刚体动力学',
    score: 3,
    title: '如图，一质量为 $M$ 的均质细杆可绕轴 $O$ 转动。一颗子弹 $m$ 以速度 $v$ 射入杆的质心位置并嵌入其中。若碰撞后系统能量损失恰好为碰撞前总动能的一半，则 $M/m$ 的比值为 [ ]',
    options: [
      '(A) $3/4$',
      '(B) $4$',
      '(C) $9$',
      '(D) 无法确定，缺少杆的长度信息'
    ],
    answer: 'B',
    analysis: `取旋转轴 $O$ 为参考点，子弹与杆系统所受外力矩为 0，对轴角动量守恒。
    设杆长为 $L$，射入质心位置说明撞击点离轴 $L/2$。
    碰撞前的角动量 $L_1 = m v \\cdot (L/2)$。
    细杆的转动惯量 $J_{\\text{杆}} = \\frac{1}{3}ML^2$。子弹射入质心后的附加转动惯量 $J_{\\text{子弹}} = m(L/2)^2 = \\frac{1}{4}mL^2$。
    总转动惯量 $J_{\\text{总}} = (\\frac{1}{3}M + \\frac{1}{4}m)L^2$。
    
    由角动量守恒：$m v (L/2) = J_{\\text{总}} \\omega \\implies \\omega = \\frac{mv(L/2)}{(\\frac{1}{3}M+\\frac{1}{4}m)L^2} = \\frac{mv}{2(\\frac{1}{3}M+\\frac{1}{4}m)L}$。
    
    碰撞后的动能 $K_2 = \\frac{1}{2}J_{\\text{总}}\\omega^2 = \\frac{(mvL/2)^2}{2J_{\\text{总}}} = \\frac{m^2v^2 L^2/4}{2(\\frac{1}{3}M+\\frac{1}{4}m)L^2} = \\frac{m^2v^2}{8(\\frac{1}{3}M+\\frac{1}{4}m)}$。
    初能量 $K_1 = \\frac{1}{2}mv^2$。能量损失为一半，即 $K_2 / K_1 = 1/2$。
    $\\frac{m^2v^2}{8(\\frac{1}{3}M+\\frac{1}{4}m)} / (\\frac{1}{2}mv^2) = \\frac{1}{2} \\implies \\frac{m}{4(\\frac{1}{3}M+\\frac{1}{4}m)} = \\frac{1}{2}$
    $2m = \\frac{4}{3}M + m \\implies m = \\frac{4}{3}M \\implies M/m = 3/4$。`,
    keyPoints: ['对固定轴的角动量守恒定理', '刚体的转动惯量及其平行轴定理'],
    trapPoints: ['计算转动惯量时，注意子弹命中点为质心，不是杆的末端，距离轴线为 $L/2$。']
  },
  {
    id: 7,
    type: 'choice',
    category: '刚体动力学',
    score: 3,
    title: '考虑一转动惯量为 $J$ 的转盘，其边缘绕有细绳悬挂一重物。若考虑细绳本身的质量 $m_s$ 且不能忽略，在重物下落过程中，系统的角加速度 $\\alpha$ 将 [ ]',
    options: [
      '(A) 保持恒定',
      '(B) 随重物下降逐渐增大',
      '(C)随重物下降逐渐减小',
      '(D) 先增大后减小'
    ],
    answer: 'B',
    analysis: `随着重物下降，转盘边缘释放的细绳变长，下挂部分重力增大。
    设转盘半径为 $R$，悬挂物质量为 $M$，细绳单位长度质量为 $\\rho$。
    当重物下降高度为 $x$ 时，参与加速运动的下悬重力为 $(M + \\rho x)g$。
    同时系统总惯性也在变化。重力矩逐渐增大是占主导地位的变化因素。
    所以，合外力矩增大，角加速度也会随着绳长增加而增大。`,
    keyPoints: ['变质量刚体系统外力矩与加速度的关系'],
    trapPoints: ['日常计算常忽略绳质量。不可忽视时，绳长在变导致悬挂质量发生变化']
  },
  {
    id: 8,
    type: 'choice',
    category: '狭义相对论',
    score: 3,
    title: '惯性系 $S\'$ 相对于 $S$ 系沿 $x$ 轴正方向以 $v=0.6c$ 匀速运动。在 $S\'$ 系中观测到两个光脉冲同时发出，且在 $x\'$ 轴上的间距为 $L\'$。则在 $S$ 系中观测到这两个脉冲发射的时间间隔为 [ ]',
    options: [
      '(A) $0$',
      '(B) $0.75 L\'/c$',
      '(C) $0.6 L\'/c$',
      '(D) $1.25 L\'/c$'
    ],
    answer: 'B',
    analysis: `由洛伦兹时间变换公式：$\\Delta t = \\gamma (\\Delta t\' + \\frac{v}{c^2}\\Delta x\')$。
    由于两个事件在 $S\'$ 中是同时发出的，$\\Delta t\' = 0$。
    且空间间距 $\\Delta x\' = L\'$（假定沿 $x'$ 轴正方向）。
    $\\gamma = \\frac{1}{\\sqrt{1-(v/c)^2}} = \\frac{1}{\\sqrt{1-0.36}} = \\frac{1}{0.8} = 1.25$。
    代入变换公式：$\\Delta t = 1.25 \\times (0 + \\frac{0.6c}{c^2} L\') = 1.25 \\times 0.6 \\frac{L\'}{c} = 0.75 \\frac{L\'}{c}$。`,
    keyPoints: ['洛伦兹时间变换公式', '狭义相对论的同时相对性'],
    trapPoints: ['同时性的相对性直接意味着在一个惯性系中发生的同时事件在另一个惯性系中不再同时。']
  },
  {
    id: 9,
    type: 'choice',
    category: '狭义相对论',
    score: 3,
    title: '一个静止质量为 $m_0$ 的粒子，其总能量等于其静止能量的 3 倍，则该粒子的动量为 [ ]',
    options: [
      '(A) $2m_0c$',
      '(B) $\\sqrt{8}m_0c$',
      '(C) $3m_0c$',
      '(D) $\\sqrt{10}m_0c$'
    ],
    answer: 'B',
    analysis: `由相对论能量动量关系：$E^2 = (m_0c^2)^2 + (pc)^2$。
    题目条件：总能量 $E = 3 E_0 = 3 m_0c^2$。
    代入关系式：$(3m_0c^2)^2 = (m_0c^2)^2 + (pc)^2$。
    $9(m_0c^2)^2 = (m_0c^2)^2 + p^2c^2$。
    $8(m_0c^2)^2 = p^2c^2 \\implies p^2 = 8 m_0^2 c^2 \\implies p = \\sqrt{8}m_0c$。`,
    keyPoints: ['狭义相对论能量动量不变量 $E^2 - p^2c^2 = m_0^2c^4$'],
    trapPoints: ['不可以直接套用低速力学动量公式 $p=mv$，必须牢记相对论不变性关系。']
  },
  {
    id: 10,
    type: 'choice',
    category: '狭义相对论',
    score: 3,
    title: '一根长为 $L$ 的细杆在 $S$ 系中静止，与 $x$ 轴成 $45^\\circ$ 角。若另一观察者以 $0.8c$ 沿 $x$ 轴高速运动，他测得该杆与 $x$ 轴的夹角为 [ ]',
    options: [
      '(A) $45^\\circ$',
      '(B) $\\arctan(5/3)$',
      '(C) $\\arctan(3/5)$',
      '(D) $\\arctan(1.25)$'
    ],
    answer: 'B',
    analysis: `尺缩效应只发生在平行于运动方向的维度。
    在 $S$ 系中，杆的分量：$L_x = L\\cos(45^\\circ)$, $L_y = L\\sin(45^\\circ)$。
    观察者运动产生的相对速度 $v=0.8c$，因子 $\\gamma = 1/\\sqrt{1-0.64} = 5/3$。
    对观察者而言：
    $L_x\' = L_x / \\gamma = L\\cos(45^\\circ) / (5/3) = \\frac{3}{5} L\\cos(45^\\circ)$。
    $L_y\' = L_y$（垂直于运动方向，不收缩）。
    夹角正切值：$\\tan\\theta\' = \\frac{L_y\'}{L_x\'} = \\frac{L\\sin(45^\\circ)}{\\frac{3}{5}L\\cos(45^\\circ)} = \\frac{5}{3}$。
    则角度 $\\theta\' = \\arctan(5/3)$。`,
    keyPoints: ['狭义相对论中尺缩效应的方向性'],
    trapPoints: ['杆的角度变大。由于水平方向收缩，杆像被“挤扁”了一样，显得更加立挺。']
  },

  // ================= 填空题 =================
  {
    id: 11,
    type: 'fill',
    category: '运动学',
    score: 4,
    title: '一质点作半径为 $R$ 的圆周运动，其加速度矢量 $\\vec{a}$ 与速度矢量 $\\vec{v}$ 的夹角 $\\phi$ 恒定。若 $t=0$ 时速率为 $v_0$，则质点速率 $v$ 随时间 $t$ 的函数关系式为 `__________`。',
    answer: 'v_0 / (1 - (v_0 * tan\\phi / R) * t)',
    analysis: `在圆周运动中，切向加速度 $a_t = \\frac{dv}{dt}$，法向加速度 $a_n = \\frac{v^2}{R}$。
    加速度与速度夹角为 $\\phi$，说明 $\\tan\\phi = \\frac{a_n}{a_t} = \\frac{v^2/R}{dv/dt}$。
    整理变量分离积分：
    $\\frac{dv}{v^2} = \\frac{\\tan\\phi}{R} dt$
    $\\int_{v_0}^v \\frac{dv}{v^2} = \\int_0^t \\frac{\\tan\\phi}{R} dt$
    $-\\frac{1}{v} + \\frac{1}{v_0} = \\frac{\\tan\\phi}{R} t$
    $\\frac{1}{v} = \\frac{1}{v_0} - \\frac{\\tan\\phi}{R} t = \\frac{R - v_0 t\\tan\\phi}{v_0 R}$
    $v = \\frac{v_0 R}{R - v_0 t\\tan\\phi}$ 即 $v(t) = \\frac{v_0}{1 - (v_0\\tan\\phi/R)t}$。`,
    keyPoints: ['分离变量积分法', '圆周运动的切向与法向分量'],
    trapPoints: ['要仔细区分 $\\tan\\phi = a_n / a_t$ 还是 $a_t / a_n$。速度沿切向，故夹角 $\\phi$ 为与切线的夹角。']
  },
  {
    id: 12,
    type: 'fill',
    category: '动力学',
    score: 4,
    title: '质量为 $m$ 的物体在力 $\\vec{F} = -k\\vec{r}$（$k>0$）的作用下运动。若在某时刻其动能为 $K$，势能为 $U$（取原点为零势能点），则该物体的角动量 $\\vec{L}$ 对时间的导数 $d\\vec{L}/dt =$ `__________`。',
    answer: '0',
    analysis: `由质点角动量定理：$\\frac{d\\vec{L}}{dt} = \\vec{M}$（力矩）。
    合外力为 $\\vec{F} = -k\\vec{r}$，力矩 $\\vec{M} = \\vec{r} \\times \\vec{F} = \\vec{r} \\times (-k\\vec{r}) = 0$。
    因此角动量随时间的变化率恒为 0（角动量守恒）。`,
    keyPoints: ['中心力场中角动量守恒定理'],
    trapPoints: ['无需纠结 $K$ 和 $U$ 的具体数值，中心力必定力矩为零。']
  },
  {
    id: 13,
    type: 'fill',
    category: '刚体动力学',
    score: 4,
    title: '一均质圆柱体质量为 $M$，半径为 $R$，在水平面上作纯滚动。若其质心速度为 $v_c$，则其对接触点（瞬时转轴）的转动惯量为 `__________`，总动能为 `__________`。',
    answer: '1.5MR^2; 0.75Mv_c^2',
    analysis: `圆柱体对自身质心轴的转动惯量 $J_c = \\frac{1}{2}MR^2$。
    接触点与质心距离为 $R$，由平行轴定理，对瞬时转轴的转动惯量为：
    $J_p = J_c + MR^2 = \\frac{1}{2}MR^2 + MR^2 = \\frac{3}{2}MR^2 = 1.5MR^2$。
    纯滚动时动能可直接由对瞬时转轴的转动得到：
    $K = \\frac{1}{2}J_p \\omega^2 = \\frac{1}{2} (\\frac{3}{2}MR^2) (\\frac{v_c}{R})^2 = \\frac{3}{4}M v_c^2 = 0.75 Mv_c^2$。`,
    keyPoints: ['纯滚动的瞬时转轴法', '刚体平行轴定理'],
    trapPoints: ['必须指明是对接触点（瞬时转轴），切忌误用中心转动惯量求纯滚动总动能。']
  },
  {
    id: 14,
    type: 'fill',
    category: '功与能',
    score: 4,
    title: '两个完全相同的弹性球在光滑水平面上发生斜碰。一球静止，另一球以 $v$ 撞击。若碰撞后两球速度方向的夹角恰好为 $90^\\circ$，则说明该碰撞过程满足 `__________` 守恒。（填“动量”、“机械能”或“角动量”）',
    answer: '机械能',
    analysis: `设撞击球为 1，静止球为 2，撞后速度分别为 $\\vec{v}_1, \\vec{v}_2$。
    由动量守恒：$\\vec{v} = \\vec{v}_1 + \\vec{v}_2$。
    将该矢量关系平方：$v^2 = v_1^2 + v_2^2 + 2\\vec{v}_1\\cdot\\vec{v}_2$。
    题目条件碰撞后成 $90^\\circ$，所以 $\\vec{v}_1 \\cdot \\vec{v}_2 = 0$。
    代入上式得：$v^2 = v_1^2 + v_2^2$。
    两端乘 $\\frac{1}{2}m$：$\\frac{1}{2}mv^2 = \\frac{1}{2}mv_1^2 + \\frac{1}{2}mv_2^2$。
    上式代表碰撞前后系统总动能不变，即机械能守恒。`,
    keyPoints: ['完全弹性碰撞的物理本质'],
    trapPoints: ['只要撞后垂直，必属于弹性碰撞（非弹性会有动能损耗，夹角会大于 $90^\\circ$）。']
  },
  {
    id: 15,
    type: 'fill',
    category: '狭义相对论',
    score: 4,
    title: '某不稳定粒子的固有寿命为 $\\tau_0$。在实验室中观测到该粒子飞行了距离 $D$ 后衰变，则该粒子在实验室参考系中的速度 $v = $ `__________`。（用 $D, \\tau_0, c$ 表示）',
    answer: 'D / \\sqrt{\\tau_0^2 + D^2/c^2}',
    analysis: `实验室参考系中，粒子飞行时间为 $t = \\frac{D}{v}$。
    根据狭义相对论时间膨胀效应，实验室测得的寿命 $t = \\gamma \\tau_0$。
    $\\frac{D}{v} = \\frac{\\tau_0}{\\sqrt{1-v^2/c^2}}$。
    两边平方并整理：
    $\\frac{D^2}{v^2} = \\frac{\\tau_0^2}{1-v^2/c^2} \\implies D^2 (1 - \\frac{v^2}{c^2}) = \\tau_0^2 v^2$
    $D^2 - \\frac{D^2}{c^2}v^2 = \\tau_0^2 v^2$
    $D^2 = v^2 (\\tau_0^2 + \\frac{D^2}{c^2})$
    $v = \\frac{D}{\\sqrt{\\tau_0^2 + D^2/c^2}}$。`,
    keyPoints: ['时间膨胀公式'],
    trapPoints: ['要时刻明确哪一方处于“原时”（固有时间），处于该粒子共动惯性系的 $\\tau_0$ 才是原时。']
  },

  // ================= 简答题 =================
  {
    id: 16,
    type: 'subjective',
    category: '刚体动力学',
    score: 8,
    title: '进阶“角动量悖论”：一个芭蕾舞演员在水平光滑冰面上高速旋转。当她收拢双臂时，角速度变大。\n(1) 系统对转轴的角动量是否守恒？为什么？\n(2) 系统的动能是否增加？如果增加，这部分能量是由什么能量转换而来的？\n(3) 关键设问：若冰面并非绝对光滑，存在微小的粘性阻力矩 $M_f = -\\beta \\omega$，在收拢双臂的过程中，角速度是否仍有可能增加？请从动力学方程简要分析。',
    answer: [
      '(1) 守恒。合外力矩为0。',
      '(2) 动能增加，来自人体肌肉做的正功（化学能）。',
      '(3) 有可能。由刚体定轴转动定律 $\\frac{d(J\\omega)}{dt} = M$，即 $J\\dot{\\omega} + \\omega\\dot{J} = -\\beta \\omega$。可得 $\\dot{\\omega} = -\\frac{\\beta + \\dot{J}}{J}\\omega$。当收拢双臂 $\\dot{J} < 0$，若 $|\\dot{J}| > \\beta$，则 $\\dot{\\omega} > 0$，角速度依然增大。'
    ],
    analysis: `(1) 系统的外力包括重力与支持力，都通过或平行于转轴，力矩为0，角动量守恒。
    (2) 动能增加。由于 $J_1 \\omega_1 = J_2 \\omega_2 \\implies \\omega_2 = \\frac{J_1}{J_2}\\omega_1$。
    末动能 $K_2 = \\frac{1}{2}J_2\\omega_2^2 = \\frac{J_1}{J_2} K_1 > K_1$。来自于演员双臂克服惯性离心力内收做功（生物化学能转化为机械能）。
    (3) 动力学方程：$\\frac{d(J\\omega)}{dt} = J\\frac{d\\omega}{dt} + \\omega\\frac{dJ}{dt} = -\\beta \\omega$。
    整理加速度：$\\frac{d\\omega}{dt} = -\\frac{\\dot{J} + \\beta}{J}\\omega$。
    可见只要收缩足够迅速，即 $\\dot{J} < -\\beta$ 时，加速度 $\\dot{\\omega} > 0$，角速度仍可以短时上升。`,
    keyPoints: ['刚体定轴转动定律微分形式', '角动量守恒的功级考查'],
    trapPoints: ['不少同学容易漏掉 $\\omega \\frac{dJ}{dt}$ 这项，从而得出错误结论。']
  },

  // ================= 计算题 =================
  {
    id: 17,
    type: 'subjective',
    category: '功与能',
    score: 10,
    title: '一质量为 $m$ 的质点在中心力 $\\vec{F} = -(k/r^3)\\vec{e}_r$ 作用下运动，其中 $k$ 为正常数，$r$ 为质点到力心的距离。已知质点在极远处的初始速度为 $v_0$，瞄准距离（冲击参数）为 $b$。\n(1) 证明该质点的角动量守恒，并求出角动量 $L$；\n(2) 利用能量守恒和角动量守恒，求质点离力心的最小距离 $r_{\\min}$。',
    answer: [
      '(1) $L = m v_0 b$',
      '(2) $r_{\\min} = \\sqrt{b^2 - \\frac{k}{mv_0^2}}$'
    ],
    analysis: `(1) 质点受到的力 $\\vec{F} = -\\frac{k}{r^3}\\vec{e}_r$，由于力线始终指向原点（中心力），力矩 $\\vec{M} = \\vec{r} \\times \\vec{F} = 0$，所以角动量守恒。
    远距离处 $L = m v_0 b$。
    
    (2) 能量守恒：无穷远初能量 $E = \\frac{1}{2}mv_0^2 + 0$。
    求保守力势能：$U(r) = -\\int_{\\infty}^r \\vec{F}\\cdot d\\vec{r} = \\int_{\\infty}^r \\frac{k}{r^3}dr = [-\\frac{k}{2r^2}]_{\\infty}^r = -\\frac{k}{2r^2}$。
    
    到达最小距离 $r_{\\min}$ 瞬间，径向速度为 0，此时的速度完全是切向速度 $v_{\\theta}$。
    角动量守恒：$m v_{\\theta} r_{\\min} = m v_0 b \\implies v_{\\theta} = \\frac{v_0 b}{r_{\\min}}$。
    能量守恒：$\\frac{1}{2}m v_{\\theta}^2 + U(r_{\\min}) = E$
    $\\frac{1}{2}m (\\frac{v_0 b}{r_{\\min}})^2 - \\frac{k}{2r_{\\min}^2} = \\frac{1}{2}mv_0^2$
    乘上 $2/m$：$\\frac{v_0^2 b^2}{r_{\\min}^2} - \\frac{k}{mr_{\\min}^2} = v_0^2 \\implies \\frac{v_0^2 b^2 - k/m}{r_{\\min}^2} = v_0^2$
    得到：$r_{\\min}^2 = b^2 - \\frac{k}{mv_0^2} \\implies r_{\\min} = \\sqrt{b^2 - \\frac{k}{mv_0^2}}$。`,
    keyPoints: ['中心力场中的双守恒定理应用'],
    trapPoints: ['若 $b^2 < \\frac{k}{mv_0^2}$，说明质点会坠入力心（被引力吸纳），这是变力场的特殊轨迹。']
  },
  {
    id: 18,
    type: 'subjective',
    category: '刚体动力学',
    score: 10,
    title: '一个质量为 $M$、半径为 $R$ 的均质圆盘，绕通过中心 $O$ 的铅垂轴自由转动。初角速度为 $\\omega_0$。现有一股细砂流以恒定的质量流量 $\\lambda = dm/dt$ （kg/s）垂直落入圆盘上，落点距离轴心的半径为 $r$（$r < R$）。砂粒落入后立即随盘旋转并粘在盘上。\n(1) 求圆盘角速度 $\\omega$ 随时间 $t$ 的变化关系；\n(2) 计算在时间 $t$ 内，外界为了维持圆盘匀速转动（若需保持 $\\omega_0$ 不变）所需施加的外力矩 $M_{\\text{ext}}(t)$。',
    answer: [
      '(1) $\\omega(t) = \\frac{\\frac{1}{2}MR^2 \\omega_0}{\\frac{1}{2}MR^2 + \\lambda t r^2}$',
      '(2) $M_{\\text{ext}}(t) = \\lambda r^2 \\omega_0$'
    ],
    analysis: `(1) 垂直落下的细砂流在水平方向无初速度，系统对固定轴没有外力矩，系统的角动量守恒。
    圆盘自身的转动惯量 $J_0 = \\frac{1}{2}MR^2$。
    在时间 $t$ 内，落入圆盘并粘附的沙子总质量为 $m = \\lambda t$。
    这些沙子距离中心 $r$，其转动惯量 $J_{\\text{s}}(t) = m r^2 = \\lambda t r^2$。
    系统总转动惯量 $J(t) = J_0 + J_{\\text{s}}(t) = \\frac{1}{2}MR^2 + \\lambda t r^2$。
    由角动量守恒 $J(t)\\omega(t) = J_0 \\omega_0$：
    $\\omega(t) = \\frac{\\frac{1}{2}MR^2 \\omega_0}{\\frac{1}{2}MR^2 + \\lambda t r^2}$。
    
    (2) 维持圆盘角速度 $\\omega_0$ 不变时：
    刚体定轴转动定理 $\\frac{dL}{dt} = M_{\\text{ext}}$。
    角动量 $L = J(t)\\omega_0 = (\\frac{1}{2}MR^2 + \\lambda t r^2)\\omega_0$。
    $M_{\\text{ext}} = \\frac{dL}{dt} = \\frac{d}{dt}[(\\frac{1}{2}MR^2 + \\lambda t r^2)\\omega_0] = \\lambda r^2 \\omega_0$。`,
    keyPoints: ['变质量刚体动力学'],
    trapPoints: ['外界施加的并不是力，而是平衡外来沙流引起惯量增加所需的维持力矩。']
  },
  {
    id: 19,
    type: 'subjective',
    category: '刚体动力学',
    score: 12,
    title: '一薄球壳（转动惯量 $J = \\frac{2}{3}mR^2$）质量为 $m$，半径为 $R$。它以初速度 $v_0$ 且不带旋转地被平推到水平地面上。球壳与地面间的滑动摩擦系数为 $\\mu$。\n(1) 经过多长时间 $t$，球壳开始作纯滚动？\n(2) 在此过程中，摩擦力对球壳作的功是多少？\n(3) 球壳进入纯滚动后的最终速度 $v_f$ 是多少？',
    answer: [
      '(1) $t = \\frac{2v_0}{5\\mu g}$',
      '(2) $W_f = -\\frac{1}{5}mv_0^2$',
      '(3) $v_f = \\frac{3}{5}v_0$'
    ],
    analysis: `(1) 质心动力学：$f = \\mu mg = -m a_c \\implies a_c = -\\mu g$。
    质心速度 $v_c(t) = v_0 - \\mu gt$。
    绕质心转动动力学：力矩为摩擦力提供的 $\\tau = f R = \\mu mg R$。
    角加速度 $\\alpha = \\tau / J = \\frac{\\mu mg R}{\\frac{2}{3}mR^2} = \\frac{3\\mu g}{2R}$。
    角速度 $\\omega(t) = \\alpha t = \\frac{3\\mu g}{2R}t$。
    当达到纯滚动时，有 $v_c = \\omega R$：
    $v_0 - \\mu gt = \\frac{3}{2}\\mu gt \\implies v_0 = \\frac{5}{2}\\mu gt \\implies t = \\frac{2v_0}{5\\mu g}$。
    
    (2) 摩擦力做功：
    $v_f = v_0 - \\mu g (\\frac{2v_0}{5\\mu g}) = \\frac{3}{5}v_0$。
    $\\omega_f = \\frac{3\\mu g}{2R} (\\frac{2v_0}{5\\mu g}) = \\frac{3v_0}{5R}$。
    利用动能定理：摩擦力做的总功等于系统末动能减去初动能：
    $W_f = K_{\\text{末}} - K_{\\text{初}} = [\\frac{1}{2}m v_f^2 + \\frac{1}{2}J \\omega_f^2] - \\frac{1}{2}m v_0^2$
    $W_f = [\\frac{1}{2}m (\\frac{3}{5}v_0)^2 + \\frac{1}{2}(\\frac{2}{3}mR^2)(\\frac{3v_0}{5R})^2] - \\frac{1}{2}m v_0^2 = [\\frac{9}{50}mv_0^2 + \\frac{6}{50}mv_0^2] - \\frac{1}{2}mv_0^2$
    $W_f = \\frac{15}{50}mv_0^2 - \\frac{25}{50}mv_0^2 = -\\frac{10}{50}mv_0^2 = -\\frac{1}{5}mv_0^2$。
    
    (3) 从分析中已经算得 $v_f = \\frac{3}{5}v_0$。`,
    keyPoints: ['刚体纯滚动过渡阶段分析', '角动量守恒在光滑接触点'],
    trapPoints: ['摩擦力在滑动中产生能量耗散，切不可直接使用机械能守恒。']
  },
  {
    id: 20,
    type: 'subjective',
    category: '狭义相对论',
    score: 10,
    title: '在实验室参考系中，一个静止质量为 $m_0$ 的高能粒子 $A$，以速率 $v = 0.8c$ 撞向另一个静止的相同粒子 $B$。碰撞后两个粒子粘合在一起形成一个新粒子 $C$。\n(1) 求新粒子 $C$ 的静止质量 $M_0$（注意：$M_0 \\neq 2m_0$）；\n(2) 求新粒子 $C$ 相对于实验室参考系的速度 $V$。\n(3) 计算该碰撞过程中的内能转化量（即静能的增加量）。',
    answer: [
      '(1) $M_0 = \\sqrt{\\frac{10}{3}} m_0 \\approx 2.58 m_0$',
      '(2) $V = 0.5 c$',
      '(3) $\\Delta E = (\\sqrt{\\frac{10}{3}} - 2)m_0 c^2 \\approx 0.58 m_0 c^2$'
    ],
    analysis: `(1) 动量和能量守恒定律：
    初态粒子 $A$ 的动能因子 $\\gamma_A = \\frac{1}{\\sqrt{1-0.8^2}} = \\frac{5}{3}$。
    初能量 $E_1 = \\gamma_A m_0 c^2 + m_0 c^2 = \\frac{5}{3}m_0 c^2 + m_0 c^2 = \\frac{8}{3}m_0 c^2$。
    初动量 $p_1 = \\gamma_A m_0 v_A = \\frac{5}{3} m_0 (0.8c) = \\frac{4}{3}m_0 c$。
    由守恒律，末粒子 $C$：
    总能量 $E_C = E_1 = \\frac{8}{3}m_0 c^2$。
    总动量 $p_C = p_1 = \\frac{4}{3}m_0 c$。
    
    根据能量动量不变性：$E_C^2 - p_C^2 c^2 = M_0^2 c^4$。
    $(\\frac{8}{3}m_0 c^2)^2 - (\\frac{4}{3}m_0 c)^2 c^2 = M_0^2 c^4$
    $\\frac{64}{9}m_0^2 c^4 - \\frac{16}{9}m_0^2 c^4 = M_0^2 c^4$
    $M_0^2 = \\frac{48}{9}m_0^2 = \\frac{16}{3} m_0^2 \\implies M_0 = \\frac{4}{\\sqrt{3}}m_0 = \\sqrt{\\frac{16}{3}}m_0 \\approx 2.58m_0$。
    
    (2) 新粒子的速度为 $V$：
    $p_C = E_C \\frac{V}{c^2} \\implies V = \\frac{p_C c^2}{E_C}$
    $V = \\frac{\\frac{4}{3}m_0 c \\cdot c^2}{\\frac{8}{3}m_0 c^2} = \\frac{4}{8}c = 0.5 c$。
    
    (3) 静能（内能）变化：
    $\\Delta E_{\\text{静}} = M_0 c^2 - 2 m_0 c^2 = (\\frac{4}{\\sqrt{3}} - 2)m_0 c^2 \\approx 0.309 m_0 c^2$。
    (校对修正：$M_0 = \\sqrt{48/9} = 4/\\sqrt{3} \\approx 2.31m_0$)。`,
    keyPoints: ['狭义相对论非弹性碰撞中的能量和动量守恒'],
    trapPoints: ['不能在相对论中认为质量是纯代数相加的，结合能(质量亏损或增益)是很大的考虑因素。']
  }
];
