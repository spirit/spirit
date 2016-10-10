export function post() {
  const el = document.createElement('div')
  el.className = 'post'
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
  
`

  return el
}
