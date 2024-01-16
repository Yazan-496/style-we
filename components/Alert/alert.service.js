'use client';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export const alertService = {
    onAlert,
    success,
    error,
    info,
    warn,
    alert,
    clear,
    dismiss,
};

export const AlertType = {
    Success: 'Success',
    Error: 'Error',
    Info: 'Info',
    Warning: 'Warning',
};

const alertSubject = new Subject();
const defaultId = 'default-alert';

// enable subscribing to alerts observable
function onAlert(id = defaultId) {
    return alertSubject.asObservable().pipe(filter((x) => x && x.id === id));
}

// convenience methods
function success(message, options) {
    alert({ ...options, type: AlertType.Success, message });
}

function error(message, options) {
    alert({ ...options, type: AlertType.Error, message });
}

function info(message, options) {
    alert({ ...options, type: AlertType.Info, message });
}

function warn(message, options) {
    alert({ ...options, type: AlertType.Warning, message });
}

// core alert method
function alert(alert) {
    alert.id = alert.id || defaultId;
    alert.ToastId = alert.ToastId || defaultId;
    alert.position = alert.position || 'bottom-0 right-0';
    alert.autoClose = alert.autoClose === undefined ? 3000 : alert.autoClose;
    alertSubject.next(alert);
}

function dismiss(alert) {
    alert.id = alert.id || defaultId;
    alert.remove = true;
    alert.ToastId = alert.ToastId || defaultId;
    alertSubject.next(alert);
}

// clear alerts
function clear(id = defaultId) {
    alertSubject.next({ id });
}
