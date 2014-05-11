var helpers = require(__dirname)

module.exports = {
  addTask: function(gulp, taskName, task) {
    gulp.task(
      taskName,
      task.descriptions.short,
      task.dependencies || [],
      function() {
        helpers.view.teaser()
        task.task()
      }, {
        aliases: task.aliases || []
      }
    )
  },

  addHelp:function(gulp, taskName, task) {
    gulp.task(
      "help:" + taskName,
      "Prints the detailed help for " + taskName + ".",
      function() {
        helpers.view.teaser()

        helpers.view.log("Help for " + taskName)
        helpers.view.log()

        if (task.descriptions.long) {
          task.descriptions.long.forEach(function(line) { helpers.log(line) })
        } else {
          helpers.view.log(task.descriptions.short)
        }

        (function(options) {
          if (options) {
            var margin = Object.keys(options).reduce(function(m, option) {
              return (m > option.length) ? m : option.length;
            }, 0);

            helpers.view.log()
            helpers.view.log('Options for ' + taskName)
            helpers.view.log()
          }

          Object.keys(options || {}).forEach(function(option) {
            var args = [option]
            args.push(new Array(margin - option.length + 1).join(" "))
            args.push(options[option])
            helpers.view.log.apply(helpers.view, args);
          })
        })(task.descriptions.options)
      }
    )
  }
}