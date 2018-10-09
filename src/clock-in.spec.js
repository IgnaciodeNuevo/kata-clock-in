import assert from 'assert';

const availableGpsCoordinates = {
    north: 11,
    south: 20,
    east: 30,
};

const gpsIsAvailable = new Promise((resolve, reject) => {
    resolve(availableGpsCoordinates);
});

const gpsIsNotAvailable = new Promise((resolve, reject) => {
    reject();
});

function sendClockIn(prom) {
    return prom
        .then(GPSdata => {
            return GPSdata;
        })
        .catch(error => {});
}

describe('time tracking', () => {
    context('GPS is required', () => {
        it('sends clock-in when GPS is available', done => {
            sendClockIn(gpsIsAvailable)
                .then(() => {
                    done();
                })
                .catch(e => console.log(e));
        });

        it('sends clock-in with coordinates when GPS is available', done => {
            sendClockIn(gpsIsAvailable)
                .then(res => {
                    let fakeResult = {
                        north: 11,
                        south: 20,
                        east: 30,
                    };
                    assert.equal(
                        JSON.stringify(res),
                        JSON.stringify(fakeResult),
                        'Should return data'
                    );
                    return;
                })
                .then(() => {
                    done();
                })
                .catch(e => console.log(e));
        });

        it('does NOT send clock-in when no GPS is available', done => {
            sendClockIn(gpsIsNotAvailable)
                .then(() => {
                    assert(false, 'Promise should have been rejected');
                    done();
                })
                .catch(e => {
                    done();
                });
        });

        // it('warns the user when no GPS is available', () => {

        // });
    });

    context('GPS is optional', () => {
        // it('does NOT send GPS data when no GPS is available', () => {
        // });
    });
});
