function Timer(tickCallback, complete) {
  var time = 0
  var offset = 0
  var id = null

  // private functions
  function start(t) {
    time = t
    if (!id) {
      offset = Date.now()
      id = setInterval(update, 1000)
    }
  }

  function update() {
    time -= delta()
    if (time < 0) {
      reset()
    } else {
      tick()
    }
  }

  function delta() {
    var now = Date.now()
    var d = now - offset

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
    /*
     * OVERFLOW
     * --------
     * Chrome & React Native slow down setInterval() ("JS timers") when they're in the background.
     * The main issue that arises in timers is that they lose time due to this, a non-issue with
     * this implementation. However, in non-trivial timers such as a pomodoro timer, where a new
     * timer is started after the old timer finishes, this can lead to other issues.
     * How these issues happen in this implementation ("Timer"):
     * 1. User switches out of tab / app
     * 2. JS timers are slowed down (let's assume for simplicity they're stopped completely)
     * 3. User switches back to tab
     * 4. Timer counts offset, let's say offset is greater than remaining time
     * 5. Timer deducts offset, and now time is less than 0, meaning time has passed even after
     *    the end of the timer
     * 6. Now time is less than 0, so Timer emits complete event
     *
     * But those few seconds that passed are lost.
     * Timer solves this by using an overflow which allows timers like pomodoro timers to adjust
     * the few seconds that were lost on the 2nd timer.
     * This is not needed in single-timer applications.
     */
    let overflow = -time
    complete(overflow)
  }

  function tick() {
    tickCallback(time)
  }

  // public API
  this.start = start
  this.pause = pause
  this.reset = reset
}

export default Timer
