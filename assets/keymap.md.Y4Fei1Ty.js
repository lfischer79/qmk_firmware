import { _ as _export_sfc, c as createElementBlock, o as openBlock, a8 as createStaticVNode } from "./chunks/framework.DyMmIvSC.js";
const __pageData = JSON.parse('{"title":"Keymap Overview","description":"","frontmatter":{},"headers":[],"relativePath":"keymap.md","filePath":"keymap.md"}');
const _sfc_main = { name: "keymap.md" };
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="keymap-overview" tabindex="-1">Keymap Overview <a class="header-anchor" href="#keymap-overview" aria-label="Permalink to &quot;Keymap Overview&quot;">​</a></h1><p>QMK keymaps are defined inside a C source file. The data structure is an array of arrays. The outer array is a list of layer arrays while the inner layer array is a list of keys. Most keyboards define a <code>LAYOUT()</code> macro to help you create this array of arrays.</p><h2 id="keymap-and-layers" tabindex="-1">Keymap and Layers <a class="header-anchor" href="#keymap-and-layers" aria-label="Permalink to &quot;Keymap and Layers {#keymap-and-layers}&quot;">​</a></h2><p>In QMK, <strong><code>const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS]</code></strong> holds multiple <strong>layers</strong> of keymap information in <strong>16 bit</strong> data holding the <strong>action code</strong>. You can define <strong>32 layers</strong> at most.</p><p>For trivial key definitions, the higher 8 bits of the <strong>action code</strong> are all 0 and the lower 8 bits holds the USB HID usage code generated by the key as <strong>keycode</strong>.</p><p>Respective layers can be validated simultaneously. Layers are indexed with 0 to 31 and higher layer has precedence.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Keymap: 32 Layers                   Layer: action code matrix</span></span>\n<span class="line"><span>-----------------                   ---------------------</span></span>\n<span class="line"><span>stack of layers                     array_of_action_code[row][column]</span></span>\n<span class="line"><span>       ____________ precedence               _______________________</span></span>\n<span class="line"><span>      /           / | high                  / ESC / F1  / F2  / F3   ....</span></span>\n<span class="line"><span>  31 /___________// |                      /-----/-----/-----/-----</span></span>\n<span class="line"><span>  30 /___________// |                     / TAB /  Q  /  W  /  E   ....</span></span>\n<span class="line"><span>  29 /___________/  |                    /-----/-----/-----/-----</span></span>\n<span class="line"><span>   :   _:_:_:_:_:__ |               :   /LCtrl/  A  /  S  /  D   ....</span></span>\n<span class="line"><span>   :  / : : : : : / |               :  /  :     :     :     :</span></span>\n<span class="line"><span>   2 /___________// |               2 `--------------------------</span></span>\n<span class="line"><span>   1 /___________// |               1 `--------------------------</span></span>\n<span class="line"><span>   0 /___________/  V low           0 `--------------------------</span></span></code></pre></div><p>Sometimes, the action code stored in keymap may be referred as keycode in some documents due to the TMK history.</p><h3 id="keymap-layer-status" tabindex="-1">Keymap Layer Status <a class="header-anchor" href="#keymap-layer-status" aria-label="Permalink to &quot;Keymap Layer Status {#keymap-layer-status}&quot;">​</a></h3><p>The state of the Keymap layer is determined by two 32 bit parameters:</p><ul><li><strong><code>default_layer_state</code></strong> indicates a base keymap layer (0-31) which is always valid and to be referred (the default layer).</li><li><strong><code>layer_state</code></strong> has current on/off status of each layer in its bits.</li></ul><p>Keymap layer &#39;0&#39; is usually the <code>default_layer</code>, with other layers initially off after booting up the firmware, although this can configured differently in <code>config.h</code>. It is useful to change <code>default_layer</code> when you completely switch a key layout, for example, if you want to switch to Colemak instead of Qwerty.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Initial state of Keymap          Change base layout</span></span>\n<span class="line"><span>-----------------------          ------------------</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>  31                               31</span></span>\n<span class="line"><span>  30                               30</span></span>\n<span class="line"><span>  29                               29</span></span>\n<span class="line"><span>   :                                :</span></span>\n<span class="line"><span>   :                                :   ____________</span></span>\n<span class="line"><span>   2   ____________                 2  /           /</span></span>\n<span class="line"><span>   1  /           /              ,-&gt;1 /___________/</span></span>\n<span class="line"><span>,-&gt;0 /___________/               |  0</span></span>\n<span class="line"><span>|                                |</span></span>\n<span class="line"><span>`--- default_layer = 0           `--- default_layer = 1</span></span>\n<span class="line"><span>     layer_state   = 0x00000001       layer_state   = 0x00000002</span></span></code></pre></div><p>On the other hand, you can change <code>layer_state</code> to overlay the base layer with other layers for features such as navigation keys, function keys (F1-F12), media keys, and/or special actions.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Overlay feature layer</span></span>\n<span class="line"><span>---------------------      bit|status</span></span>\n<span class="line"><span>       ____________        ---+------</span></span>\n<span class="line"><span>  31  /           /        31 |   0</span></span>\n<span class="line"><span>  30 /___________// -----&gt; 30 |   1</span></span>\n<span class="line"><span>  29 /___________/  -----&gt; 29 |   1</span></span>\n<span class="line"><span>   :                        : |   :</span></span>\n<span class="line"><span>   :   ____________         : |   :</span></span>\n<span class="line"><span>   2  /           /         2 |   0</span></span>\n<span class="line"><span>,-&gt;1 /___________/  -----&gt;  1 |   1</span></span>\n<span class="line"><span>|  0                        0 |   0</span></span>\n<span class="line"><span>|                                 +</span></span>\n<span class="line"><span>`--- default_layer = 1            |</span></span>\n<span class="line"><span>     layer_state   = 0x60000002 &lt;-&#39;</span></span></code></pre></div><h3 id="layer-precedence-and-transparency" tabindex="-1">Layer Precedence and Transparency <a class="header-anchor" href="#layer-precedence-and-transparency" aria-label="Permalink to &quot;Layer Precedence and Transparency&quot;">​</a></h3><p>Note that <em><strong>higher layers have higher priority within the stack of layers</strong></em>. The firmware works its way down from the highest active layers to look up keycodes. Once the firmware locates a keycode other than <code>KC_TRNS</code> (transparent) on an active layer, it stops searching, and lower layers aren&#39;t referenced.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>   ____________</span></span>\n<span class="line"><span>  /           /  &lt;--- Higher layer</span></span>\n<span class="line"><span> /  KC_TRNS  //</span></span>\n<span class="line"><span>/___________//   &lt;--- Lower layer (KC_A)</span></span>\n<span class="line"><span>/___________/</span></span></code></pre></div><p>In the above scenario, the non-transparent keys on the higher layer would be usable, but whenever <code>KC_TRNS</code> (or equivalent) is defined, the keycode (<code>KC_A</code>) on the lower level would be used.</p><p><strong>Note:</strong> Valid ways to denote transparency on a given layer:</p><ul><li><code>KC_TRANSPARENT</code></li><li><code>KC_TRNS</code> (alias)</li><li><code>_______</code> (alias)</li></ul><p>These keycodes allow the processing to fall through to lower layers in search of a non-transparent keycode to process.</p><h2 id="anatomy-of-a-keymap-c" tabindex="-1">Anatomy of a <code>keymap.c</code> <a class="header-anchor" href="#anatomy-of-a-keymap-c" aria-label="Permalink to &quot;Anatomy of a `keymap.c`&quot;">​</a></h2><p>For this example we will walk through an <a href="https://github.com/qmk/qmk_firmware/blob/ca01d94005f67ec4fa9528353481faa622d949ae/keyboards/clueboard/keymaps/default/keymap.c" target="_blank" rel="noreferrer">older version of the default Clueboard 66% keymap</a>. You&#39;ll find it helpful to open that file in another browser window so you can look at everything in context.</p><p>There are 2 main sections of a <code>keymap.c</code> file you&#39;ll want to concern yourself with:</p><ul><li><a href="#definitions">The Definitions</a></li><li><a href="#layers-and-keymaps">The Layer/Keymap Datastructure</a></li></ul><h3 id="definitions" tabindex="-1">Definitions <a class="header-anchor" href="#definitions" aria-label="Permalink to &quot;Definitions&quot;">​</a></h3><p>At the top of the file you&#39;ll find this:</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#include</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> QMK_KEYBOARD_H</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Helpful defines</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#define</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> GRAVE_MODS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">MOD_BIT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(KC_LSFT)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">MOD_BIT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(KC_RSFT)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">MOD_BIT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(KC_LGUI)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">MOD_BIT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(KC_RGUI)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">MOD_BIT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(KC_LALT)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">MOD_BIT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(KC_RALT))</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * </span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    *  You can use _______ in place for KC_TRNS (transparent)   *</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    *  Or you can use XXXXXXX for KC_NO (NOOP)                  *</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Each layer gets a name for readability.</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// The underscores don&#39;t mean anything - you can</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// have a layer called STUFF or any other name.</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Layer names don&#39;t all need to be of the same</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// length, and you can also skip them entirely</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// and just use numbers.</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enum</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> layer_names {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    _BL,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    _FL,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    _CL,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><p>These are some handy definitions we can use when building our keymap and our custom function. The <code>GRAVE_MODS</code> definition will be used later in our custom function, and the following <code>_BL</code>, <code>_FL</code>, and <code>_CL</code> defines make it easier to refer to each of our layers.</p><p>Note: You may also find some older keymap files may also have a define(s) for <code>_______</code> and/or <code>XXXXXXX</code>. These can be used in place for <code>KC_TRNS</code> and <code>KC_NO</code> respectively, making it easier to see what keys a layer is overriding. These definitions are now unnecessary, as they are included by default.</p><h3 id="layers-and-keymaps" tabindex="-1">Layers and Keymaps <a class="header-anchor" href="#layers-and-keymaps" aria-label="Permalink to &quot;Layers and Keymaps&quot;">​</a></h3><p>The main part of this file is the <code>keymaps[]</code> definition. This is where you list your layers and the contents of those layers. This part of the file begins with this definition:</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> uint16_t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> PROGMEM keymaps</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">[]</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[MATRIX_ROWS][MATRIX_COLS] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span></code></pre></div><p>After this you&#39;ll find the layer definitions. Typically you&#39;ll have one or more &quot;base layers&quot; (such as QWERTY, Dvorak, or Colemak) and then you&#39;ll layer on top of that one or more &quot;function&quot; layers. Due to the way layers are processed you can&#39;t overlay a &quot;lower&quot; layer on top of a &quot;higher&quot; layer.</p><p><code>keymaps[][MATRIX_ROWS][MATRIX_COLS]</code> in QMK holds the 16 bit action code (sometimes referred as the quantum keycode) in it. For the keycode representing typical keys, its high byte is 0 and its low byte is the USB HID usage ID for keyboard.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>TMK from which QMK was forked uses <code>const uint8_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS]</code> instead and holds the 8 bit keycode.</p></div><h4 id="base-layer" tabindex="-1">Base Layer <a class="header-anchor" href="#base-layer" aria-label="Permalink to &quot;Base Layer&quot;">​</a></h4><p>Here is an example of the Clueboard&#39;s base layer:</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[_BL] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> LAYOUT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    F</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),    KC_1,    KC_2,   KC_3,   KC_4,   KC_5,   KC_6,   KC_7,   KC_8,   KC_9,    KC_0,     KC_MINS,  KC_EQL,   KC_GRV,  KC_BSPC,          KC_PGUP,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    KC_TAB,  KC_Q,    KC_W,   KC_E,   KC_R,   KC_T,   KC_Y,   KC_U,   KC_I,   KC_O,    KC_P,     KC_LBRC,  KC_RBRC,  KC_BSLS,                   KC_PGDN,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    KC_CAPS, KC_A,    KC_S,   KC_D,   KC_F,   KC_G,   KC_H,   KC_J,   KC_K,   KC_L,    KC_SCLN,  KC_QUOT,  KC_NUHS,  KC_ENT,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    KC_LSFT, KC_NUBS, KC_Z,   KC_X,   KC_C,   KC_V,   KC_B,   KC_N,   KC_M,   KC_COMM, KC_DOT,   KC_SLSH,  KC_INT1,  KC_RSFT,          KC_UP,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    KC_LCTL, KC_LGUI, KC_LALT, KC_INT5,          KC_SPC,KC_SPC,                        KC_INT4,  KC_RALT,  KC_RCTL,  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">MO</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_FL), KC_LEFT, KC_DOWN, KC_RGHT</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span></code></pre></div><p>Some interesting things to note about this:</p><ul><li>The layer is defined using the LAYOUT macro, traditionally defined in the keyboard&#39;s <code>.h</code> file.</li><li>The LAYOUT macro takes a single list of keycodes, but we have written it in the C source using embedded whitespace and newlines to visualize where each key is on the physical device.</li><li>The LAYOUT macro hides and handles the mapping to the hardware&#39;s key scan matrix.</li><li>Plain keyboard scancodes are prefixed with KC_, while &quot;special&quot; keys are not.</li><li>The upper left key activates custom function 0 (<code>F(0)</code>)</li><li>The &quot;Fn&quot; key is defined with <code>MO(_FL)</code>, which moves to the <code>_FL</code> layer while that key is being held down.</li></ul><h4 id="function-overlay-layer" tabindex="-1">Function Overlay Layer <a class="header-anchor" href="#function-overlay-layer" aria-label="Permalink to &quot;Function Overlay Layer&quot;">​</a></h4><p>Our function layer is, from a code point of view, no different from the base layer. Conceptually, however, you will build that layer as an overlay, not a replacement. For many people this distinction does not matter, but as you build more complicated layering setups it matters more and more.</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[_FL] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> LAYOUT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    KC_GRV,  KC_F1,   KC_F2,  KC_F3,  KC_F4,  KC_F5,  KC_F6,  KC_F7,  KC_F8,  KC_F9,   KC_F10,   KC_F11,   KC_F12,   </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, KC_DEL,           BL_STEP,</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    _______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,KC_PSCR,KC_SCRL, KC_PAUS,  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,                   </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    _______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">MO</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_CL),</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    _______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,          KC_PGUP,</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    _______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,        </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,                        </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_______</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">MO</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_FL), KC_HOME, KC_PGDN, KC_END</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span></code></pre></div><p>Some interesting things to note:</p><ul><li>We have used our <code>_______</code> definition to turn <code>KC_TRNS</code> into <code>_______</code>. This makes it easier to spot the keys that have changed on this layer.</li><li>While in this layer if you press one of the <code>_______</code> keys it will activate the key in the next lowest active layer.</li></ul><h1 id="nitty-gritty-details" tabindex="-1">Nitty Gritty Details <a class="header-anchor" href="#nitty-gritty-details" aria-label="Permalink to &quot;Nitty Gritty Details&quot;">​</a></h1><p>This should have given you a basic overview for creating your own keymap. For more details see the following resources:</p><ul><li><a href="./keycodes">Keycodes</a></li><li><a href="./faq_keymap">Keymap FAQ</a></li></ul><p>We are actively working to improve these docs. If you have suggestions for how they could be made better please <a href="https://github.com/qmk/qmk_firmware/issues/new" target="_blank" rel="noreferrer">file an issue</a>!</p>', 51);
const _hoisted_52 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, _hoisted_52);
}
const keymap = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  keymap as default
};
