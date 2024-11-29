"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
// * database connection
const database_config_1 = require("./infrastructure/config/database.config");
// * routers
const userRoutes_1 = __importDefault(require("./presentation/http/routes/userRoutes"));
const adminRoutes_1 = __importDefault(require("./presentation/http/routes/adminRoutes"));
const customerRouter_1 = __importDefault(require("./presentation/http/routes/customerRouter"));
const errorHandler_1 = require("./presentation/http/middlewares/errorHandler");
const workerRouter_1 = __importDefault(require("./presentation/http/routes/workerRouter"));
// * socket
const chat_1 = require("./infrastructure/service/socket/chat");
const app = (0, express_1.default)();
// * session configuration
app.use((0, express_session_1.default)({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
dotenv_1.default.config(); // * config the dotenv for accessing the value inside the file.
app.use(express_1.default.json()); //* using for parse the body data in json format
app.use((0, cookie_parser_1.default)()); // * cookie parser use to access the cookie from client side
app.use((0, morgan_1.default)("dev")); // *
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});
// const allowedOrigins = [
//   "https://e-vent-project-ii.vercel.app",
//   "https://www.eventopia.shop",
//   "https://eventopia.shop", 'http://localhost:3000', '*'
// ];
const allowedOrigins = [
    "https://www.profinders.online",
    "https://api.profinders.online",
    "https://profinders.vercel.app",
    "http://profinders.online",
    "https://profinders.online",
    "http://localhost:3000",
    "https://test.payu.in",
    '*'
];
const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Role'],
    credentials: true // * Allows cookies and other credentials to be shared
};
app.use((0, cors_1.default)(corsOptions)); // Ensure this is before your routes
// Handle preflight requests for all routes
app.options('*', (0, cors_1.default)(corsOptions));
// * application layer
app.use("/v1/api/user", userRoutes_1.default);
app.use('/v1/api/customer', customerRouter_1.default);
app.use("/v1/api/admin", adminRoutes_1.default);
app.use("/v1/api/worker", workerRouter_1.default);
// * Error handle middleware
app.use(errorHandler_1.errorHandles);
const PORT = process.env.PORT || 3002;
const httpServer = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD']
    }
});
(0, chat_1.socketHandler)(exports.io);
(0, database_config_1.connectDB)().then(() => {
    httpServer.listen(PORT, () => {
        console.log(`server running on \n http://localhost:${PORT}`);
    });
});
