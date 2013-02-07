(function ($ns) {
    var network, xhr, requests;

    module("Network", {
        setup: function () {
            xhr = sinon.useFakeXMLHttpRequest();
            requests = [];
            xhr.onCreate = function (req) { requests.push(req); };

            network = new $ns.Network("abc123");
        },
        teardown: function() {
            xhr.restore();
        }
    });

    test(".trackEndpoint", function () {
        equal(network.trackEndpoint(), "/track/abc123")
    });

    test(".xhr", function () {
        deepEqual(network.xhr(), new xhr());
    });

    test(".send", function () {
        network.send({a: "abc123", n: 123});
        equal(requests.length, 1);
        ok(requests[0].url.match(network.trackEndpoint() + "$"));
    });
}(s7tr));