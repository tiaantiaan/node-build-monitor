define(['ko', 'moment', 'countdown'], function (ko, moment, countdown) {
    var BuildViewModel = function (build) {
        this.isMenuVisible = ko.observable(false);

        this.id = ko.observable();
        this.isRunning = ko.observable();
        this.isQueued = ko.observable();
        this.project = ko.observable();
        this.branch = ko.observable();
        this.commit = ko.observable();
        this.definition = ko.observable();
        this.number = ko.observable();
        this.startedAt = ko.observable();
        this.finishedAt = ko.observable();
        this.queuedAt = ko.observable();
        this.status = ko.observable(build.status);
        this.statusText = ko.observable();
        this.reason = ko.observable();
        this.requestedFor = ko.observable();
        this.hasWarnings = ko.observable();
        this.hasErrors = ko.observable();
        this.url = ko.observable();
        this.description = ko.observable();

        this.update = function (build) {
            this.id(build.id);
            this.isRunning(build.isRunning);
            this.isQueued(build.isQueued);
            this.project(build.project);
            this.branch(build.branch);
            this.commit(build.commit);
            this.definition(build.definition);
            this.number(build.number);
            this.startedAt(moment(build.startedAt));
            this.finishedAt(moment(build.finishedAt));
            this.queuedAt(moment(build.queuedAt));
            this.status(build.status);
            this.statusText(build.statusText);
            this.reason(build.reason);
            this.requestedFor(build.requestedFor);
            this.hasWarnings(build.hasWarnings);
            this.hasErrors(build.hasErrors);
            this.url(build.url);
            this.description(build.description);
        };

        this.update(build);

        this.style = ko.computed(function () {
            if (this.status()) {
                return {
                    'color': 'white',
                    'background-color': this.status().toLowerCase()
                };
            }
        }, this);

        this.time = ko.forcibleComputed(function () {
            return this.isRunning() ?
                'started ' + moment(this.startedAt()).fromNow() :
                (this.isQueued() ?
                    'not started yet' :
                    'finished ' + moment(this.finishedAt()).fromNow()
                );
        }, this);

        this.duration = ko.forcibleComputed(function () {
            return this.isRunning() ?
                'running for ' + countdown(this.startedAt()).toString() :
                (this.isQueued() ?
                    'queued for ' + countdown(this.startedAt(), this.queuedAt()).toString() :
                    'ran for ' + countdown(this.startedAt(), this.finishedAt()).toString()
                );
        }, this);

        this.isMenuAvailable = ko.computed(function () {
            return this.url() || false;
        }, this);
    };

    return BuildViewModel;
});
