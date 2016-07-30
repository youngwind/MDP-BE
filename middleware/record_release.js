// 记录组件版发包记录
module.exports = function () {
    return function (req, res, next) {
        var componentId = req.query.componentId;

        // 这里的代码太low了。。。我都看不下去了。。。有空得重写。。
        Release.find({
            where: {
                componentId: componentId
            },
            order: 'createdAt DESC'

        }).then(function (data) {
            var componentVersion;

            Component.find({
                where: {
                    id: componentId
                }
            }).then(function (component) {
                console.log(component)

                if (!data) {
                    componentVersion = '1.0.0';
                } else {
                    componentVersion = (data.componentVersion.split('.').join('') * 1 + 1).toString().split('').join('.');
                }
                Release.create({
                    componentId: componentId,
                    componentVersion: componentVersion,
                    name: component.name
                }).then(function (data) {
                    req.query.nextVersion = componentVersion;
                    next()
                });
            });


        });
    }
};