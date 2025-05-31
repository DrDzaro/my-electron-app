import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, Home, BarChart3, Settings, Bell, Wifi, WifiOff, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const AirQualityApp = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [co2Data, setCo2Data] = useState(420);
  const [isConnected, setIsConnected] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  // Simulasi data real-time CO2
  useEffect(() => {
    const interval = setInterval(() => {
      setCo2Data(prev => prev + (Math.random() - 0.5) * 20);
      setIsConnected(Math.random() > 0.1); // 90% uptime simulation
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getAirQualityStatus = (co2) => {
    if (co2 < 400) return { status: 'Excellent', color: 'text-green-500', bg: 'bg-green-100' };
    if (co2 < 600) return { status: 'Good', color: 'text-blue-500', bg: 'bg-blue-100' };
    if (co2 < 800) return { status: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-100' };
    if (co2 < 1000) return { status: 'Poor', color: 'text-orange-500', bg: 'bg-orange-100' };
    return { status: 'Dangerous', color: 'text-red-500', bg: 'bg-red-100' };
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ name: 'John Doe', email: loginForm.email });
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }
    setUser({ name: registerForm.name, email: registerForm.email });
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wifi className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">AirMonitor</h1>
          <p className="text-gray-600">ESP32 Air Quality Monitor</p>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              required
            />
          </div>
          
          <div className="relative">
            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              required
            />
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Login
          </button>
        </div>
        
        <div className="text-center mt-6">
          <button
            onClick={() => setCurrentScreen('register')}
            className="text-blue-500 hover:underline"
          >
            Belum punya akun? Daftar di sini
          </button>
        </div>
      </div>
    </div>
  );

  const RegisterScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Daftar Akun</h1>
          <p className="text-gray-600">Buat akun baru untuk monitoring udara</p>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <User className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={registerForm.name}
              onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
              required
            />
          </div>
          
          <div className="relative">
            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
              required
            />
          </div>
          
          <div className="relative">
            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
              required
            />
          </div>
          
          <div className="relative">
            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="password"
              placeholder="Konfirmasi Password"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={registerForm.confirmPassword}
              onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
              required
            />
          </div>
          
          <button
            onClick={handleRegister}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Daftar
          </button>
        </div>
        
        <div className="text-center mt-6">
          <button
            onClick={() => setCurrentScreen('login')}
            className="text-green-500 hover:underline"
          >
            Sudah punya akun? Login di sini
          </button>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => {
    const airQuality = getAirQualityStatus(co2Data);
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">AirMonitor</h1>
            <p className="text-sm text-gray-600">Selamat datang, {user?.name}</p>
          </div>
          <div className="flex items-center space-x-3">
            {isConnected ? (
              <Wifi className="w-5 h-5 text-green-500" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-500" />
            )}
            <Bell className="w-5 h-5 text-gray-600" />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Status Udara Real-time</h2>
              <div className={`px-3 py-1 rounded-full ${airQuality.bg}`}>
                <span className={`text-sm font-medium ${airQuality.color}`}>
                  {airQuality.status}
                </span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {Math.round(co2Data)} ppm
              </div>
              <p className="text-gray-600">Konsentrasi CO2</p>
            </div>
            
            <div className="mt-4 bg-gray-100 rounded-lg h-2">
              <div 
                className={`h-2 rounded-lg transition-all duration-300 ${
                  co2Data < 400 ? 'bg-green-500' :
                  co2Data < 600 ? 'bg-blue-500' :
                  co2Data < 800 ? 'bg-yellow-500' :
                  co2Data < 1000 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min((co2Data / 1200) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Device Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Perangkat</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">ESP32 Connection</span>
                <div className="flex items-center">
                  {isConnected ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-green-600 text-sm">Connected</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-500 mr-2" />
                      <span className="text-red-600 text-sm">Disconnected</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Sensor MQ-135</span>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-green-600 text-sm">Active</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Update</span>
                <span className="text-gray-800 text-sm">
                  {new Date().toLocaleTimeString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Peringatan</h3>
            {co2Data > 800 ? (
              <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-500 mr-3" />
                <div>
                  <p className="text-orange-800 font-medium">Kualitas Udara Menurun</p>
                  <p className="text-orange-600 text-sm">CO2 level tinggi terdeteksi</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <div>
                  <p className="text-green-800 font-medium">Kualitas Udara Baik</p>
                  <p className="text-green-600 text-sm">Semua parameter dalam batas normal</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className={`flex flex-col items-center py-2 px-4 ${currentScreen === 'dashboard' ? 'text-blue-500' : 'text-gray-600'}`}
            >
              <Home className="w-5 h-5 mb-1" />
              <span className="text-xs">Dashboard</span>
            </button>
            
            <button 
              onClick={() => setCurrentScreen('analytics')}
              className={`flex flex-col items-center py-2 px-4 ${currentScreen === 'analytics' ? 'text-blue-500' : 'text-gray-600'}`}
            >
              <BarChart3 className="w-5 h-5 mb-1" />
              <span className="text-xs">Analytics</span>
            </button>
            
            <button 
              onClick={() => setCurrentScreen('settings')}
              className={`flex flex-col items-center py-2 px-4 ${currentScreen === 'settings' ? 'text-blue-500' : 'text-gray-600'}`}
            >
              <Settings className="w-5 h-5 mb-1" />
              <span className="text-xs">Settings</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AnalyticsScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-gray-800">Data Analytics</h1>
      </div>
      
      <div className="p-4 space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Grafik Harian</h3>
          <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart akan ditampilkan di sini</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistik</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">421</div>
              <p className="text-sm text-gray-600">Rata-rata CO2</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">87%</div>
              <p className="text-sm text-gray-600">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-gray-800">Pengaturan</h1>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Profil</h3>
          <div className="space-y-2">
            <p className="text-gray-600">Nama: {user?.name}</p>
            <p className="text-gray-600">Email: {user?.email}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Peringatan</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Alert CO2 > 800 ppm</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Push Notifications</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => {
            setIsLoggedIn(false);
            setCurrentScreen('login');
            setUser(null);
          }}
          className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return currentScreen === 'login' ? <LoginScreen /> : <RegisterScreen />;
  }

  return (
    <>
      {currentScreen === 'dashboard' && <Dashboard />}
      {currentScreen === 'analytics' && <AnalyticsScreen />}
      {currentScreen === 'settings' && <SettingsScreen />}
    </>
  );
};

export default AirQualityApp;