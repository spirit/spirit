/**
 * Create a simple post block
 * @returns {Element}
 */
export function post(classNames = '') {
  const el = document.createElement('div');
  el.className = 'post ' + classNames;
  el.innerHTML = `

  <h1>Title Post</h1>
  <p class="subtitle">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi corporis debitis eligendi
    et explicabo illo iusto non, obcaecati optio, quis ut vel voluptatum!
    Consectetur eos facilis odio officia sequi temporibus!
  </p>

  <div class="entry">
    <h3>Post Entry</h3>
    <div class="entry-container">
      <span class="post-date">date</span>
      <span class="post-args">args</span>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Aliquid aut debitis deleniti dolores excepturi expedita fugit illum laborum magni odit officia
        quidem quisquam quos recusandae repellendus, saepe sequi veritatis voluptatibus?
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Aliquid aut debitis deleniti dolores excepturi expedita fugit illum laborum magni odit officia
        quidem quisquam quos recusandae repellendus, saepe sequi veritatis voluptatibus?
      </p>
    </div>
  </div>

`;

  return el;
}

export function ghost() {
  const el = document.createElement('div');
  el.className = 'ghost';

  el.innerHTML = `

 <svg viewBox="0 0 231 154.5" enableBackground="new 0 0 231 154.5" data-spirit-id="ghost">

      <path data-spirit-id="outline" fill="transparent" stroke="#FFFFFF" strokeWidth="4" strokeMiterlimit="10" d="M98,47.3c0-14.3,11.6-26,26-26s26,11.6,26,26v2.6
                  c0,29.3-23.8,53.1-53.1,53.1H84.6c-3.3,0-5.9-2.7-5.9-5.9c0-3.3,2.7-5.9,5.9-5.9s5.9-2.7,5.9-5.9s-2.7-5.9-5.9-5.9s-5.9-2.7-5.9-5.9
                  c0-3.3,2.7-5.9,5.9-5.9c1.7,0,7.5,0,7.5,0c3.3,0,5.9-2.7,5.9-5.9V47.3" />

      <g data-spirit-id="eyes">
        <circle fill="#FFFFFF" cx="124.8" cy="45.6" r="4.2" />
        <circle fill="#FFFFFF" cx="137" cy="45.6" r="4.2" />
      </g>

      <path data-spirit-id="shadow" opacity="0.3" fill="#202b49" d="M127,133.2H87.7c-1.8,0-3.3-1.5-3.3-3.3v-1.4c0-1.8,1.5-3.3,3.3-3.3H127
                  c1.8,0,3.3,1.5,3.3,3.3v1.4C130.3,131.8,128.8,133.2,127,133.2z" />

    </svg>

`;

  return el;
}
