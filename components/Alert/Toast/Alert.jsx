import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { alertService, AlertType } from 'components/Alert';

export { Alert };

Alert.propTypes = {
    id: PropTypes.string,
    ToastId: PropTypes.string,
    fade: PropTypes.bool,
    position: PropTypes.string,
};

Alert.defaultProps = {
    id: 'default-alert',
    ToastId: 'default-alert',
    fade: true,
    position: 'bottom-0 right-0',
};

function Alert({ id, fade, position, ToastId }) {
    const mounted = useRef(false);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        mounted.current = true;
        // subscribe to new alert notifications
        const subscription = alertService.onAlert(id).subscribe((alert) => {
            alert.itemId = alert.ToastId;
            setAlerts((alerts) => [...alerts, alert]);

            if (alert.remove) {
                removeAlert(alert);
            }
            if (alert.autoClose) {
                setTimeout(() => removeAlert(alert), alert.autoClose || 3000);
            }
        });

        // clear alerts on location change
        const clearAlerts = () => alertService.clear(id);

        // clean up function that runs when the component unmounts
        return () => {
            mounted.current = false;

            // unsubscribe to avoid memory leaks
            subscription.unsubscribe();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function omit(arr, key) {
        return arr.map((obj) => {
            const { [key]: omitted, ...rest } = obj;
            return rest;
        });
    }

    function removeAlert(alert) {
        if (!mounted.current) return;

        if (fade) {
            // fade out alert
            setAlerts((alerts) =>
                alerts.map((x) =>
                    x.itemId === alert.itemId ? { ...x, fade: true } : x
                )
            );

            // remove alert after faded out
            setTimeout(() => {
                setAlerts((alerts) =>
                    alerts.filter((x) => x.itemId !== alert.itemId)
                );
            }, 250);
        } else {
            // remove alert
            setAlerts((alerts) =>
                alerts.filter((x) => x.itemId !== alert.itemId)
            );
        }
    }

    function cssClasses(alert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];

        const alertTypeClass = {
            [AlertType.Success]: 'alert-success',
            [AlertType.Error]: 'alert-danger',
            [AlertType.Info]: 'alert-info',
            [AlertType.Warning]: 'alert-warning',
        };

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }

    if (!alerts.length) return null;
    return (
        <div className={clsx('fixed z-[9999999999999] w-max h-max', position)}>
            {alerts.map((alert, index) => (
                <div
                    key={index}
                    className={clsx(
                        alert.position,
                        `text-white z-[9999999999999] px-1 min-w-[150px] text-center w-max h-max max-h-8 absolute bg-gray-400`
                    )}
                >
                    <span>{alert.message}</span>
                </div>
            ))}
        </div>
    );
}
