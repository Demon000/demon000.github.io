var pomodoro = new Vue(
  {
    el: 'body',
    data:
    {
      work: 25 * 60,
      break: 5 * 60,
      running: 'work',
      now: 0,
      paused: true,
    },
    created()
    {
      this.count();
      this.setnow();
    },
    methods:
    {
      setbreak(v)
      {
        if(this.break + v > 0 && this.paused)
        {
          this.break += v;
          this.setnow();
        }
      },
      setwork(v)
      {
        if(this.work + v > 0 && this.paused)
        {
          this.work += v;
          this.setnow();
        }
      },
      setnow()
      {
        this.now = this[this.running];
      },
      count()
      {
        if(!this.paused)
        {
          if(this.now > 0)
            this.now--;
          else if(this.running == 'work')
          {
            this.running = 'break';
            this.setnow();
          }
          else
          {
            this.running = 'work';
            this.setnow();
          }
        }
        var self = this;
        setTimeout(function(){self.count();}, 1000);
      },

      click()
      {
        if(this.paused)
          this.paused = false;
        else
          this.paused = true;
      }
    },
  });