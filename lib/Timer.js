function Timer(tickCallback, complete) {
  let time = 0
  let offset = 0
  let id = null

  function delta() {
    const now = Date.now()
    const d = now - offset

    offset = now
    return d
  }

  function pause() {
    if (id) {
      clearInterval(id)
      id = null
    }
  }

  function reset() {
    pause()
    const overflow = -time
    complete(overflow)
  }

  function tick() {
    tickCallback(time)
  }

  function update() {
    time -= delta()
    if (time < 0) {
      reset()
    } else {
      tick()
    }
  }

  // private functions
  function start(t) {
    time = t
    if (!id) {
      offset = Date.now()
      id = setInterval(update, 1000)
    }
  }

  // public API
  this.start = start
  this.pause = pause
  this.reset = reset
}

export default Timer
