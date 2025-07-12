import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';
import { X, AlertTriangle, Trash2, User, Shield, Lock, Eye, EyeOff } from 'lucide-react';

function PreferencesModal({ isOpen, onClose }) {
  const { deleteAccount, changePassword, currentUser } = useAuth();
  const { t, currentLanguage, translateFirebaseError } = useLanguage();
  const { currentCurrency, availableCurrencies } = useCurrency();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState('account');

  // Estados para cambio de contraseña
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  if (!isOpen) return null;

  // Validar campos de contraseña
  const validatePasswordFields = () => {
    const errors = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = t('currentPasswordRequired');
    }

    if (!passwordData.newPassword) {
      errors.newPassword = t('newPasswordRequired');
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = t('newPasswordMinLength');
    }

    if (!passwordData.confirmNewPassword) {
      errors.confirmNewPassword = t('confirmNewPasswordRequired');
    } else if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      errors.confirmNewPassword = t('newPasswordsNoMatch');
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Manejar cambio de contraseña
  const handleChangePassword = async () => {
    if (!validatePasswordFields()) return;

    setIsChangingPassword(true);
    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword, {
        success: t('passwordChanged'),
        error: t('errorChangingPassword'),
        translateFirebaseError
      });

      // Limpiar formulario y cerrar
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
      setPasswordErrors({});
      setShowChangePassword(false);
      setShowPasswords({
        current: false,
        new: false,
        confirm: false
      });
    } catch (error) {
      console.error('Error changing password:', error);
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Manejar cambios en los campos de contraseña
  const handlePasswordInputChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    if (passwordErrors[field]) {
      setPasswordErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Toggle visibilidad de contraseña
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteConfirmText('');
    setActiveTab('account');

    // Limpiar estados de cambio de contraseña
    setShowChangePassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
    setPasswordErrors({});
    setShowPasswords({
      current: false,
      new: false,
      confirm: false
    });

    onClose();
  };

  const handleDeleteAccount = async () => {
    if (isDeleting) return;

    const requiredText = currentLanguage === 'en' ? 'DELETE' :
      currentLanguage === 'fr' ? 'SUPPRIMER' :
        currentLanguage === 'pt' ? 'EXCLUIR' :
          currentLanguage === 'it' ? 'ELIMINA' : 'ELIMINAR';

    if (deleteConfirmText !== requiredText) {
      return;
    }

    if (!window.confirm(t('confirmDeleteAccount'))) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteAccount({
        success: t('accountDeleted'),
        error: t('errorDeletingAccount'),
        translateFirebaseError
      });
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getRequiredDeleteText = () => {
    return currentLanguage === 'en' ? 'DELETE' :
      currentLanguage === 'fr' ? 'SUPPRIMER' :
        currentLanguage === 'pt' ? 'EXCLUIR' :
          currentLanguage === 'it' ? 'ELIMINA' : 'ELIMINAR';
  };

  const isDeleteConfirmValid = deleteConfirmText === getRequiredDeleteText();

  const tabs = [
    { id: 'account', name: 'Cuenta', icon: User },
    { id: 'security', name: 'Seguridad', icon: Shield }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <User className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t('preferences')}
              </h2>
              <p className="text-sm text-gray-600">
                Personaliza tu experiencia
              </p>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 bg-primary-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {activeTab === 'account' && (
            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {currentUser?.displayName || 'Usuario'}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {currentUser?.email}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Miembro desde {new Date().getFullYear()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-700">
                    {currentLanguage.toUpperCase()}
                  </div>
                  <div className="text-sm text-blue-600">
                    Idioma actual
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-700">
                    {currentCurrency}
                  </div>
                  <div className="text-sm text-green-600">
                    Moneda actual
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-700">
                    {availableCurrencies.find(c => c.code === currentCurrency)?.symbol || '$'}
                  </div>
                  <div className="text-sm text-purple-600">
                    Símbolo moneda
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Configuración actual
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Idioma de interfaz</span>
                    <span className="text-sm font-medium text-gray-900">
                      {currentLanguage === 'es' ? 'Español' :
                        currentLanguage === 'en' ? 'English' :
                          currentLanguage === 'fr' ? 'Français' :
                            currentLanguage === 'pt' ? 'Português' :
                              currentLanguage === 'it' ? 'Italiano' : currentLanguage}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Moneda principal</span>
                    <span className="text-sm font-medium text-gray-900">
                      {availableCurrencies.find(c => c.code === currentCurrency)?.name || currentCurrency}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Cuenta creada</span>
                    <span className="text-sm font-medium text-gray-900">
                      {currentUser?.metadata?.creationTime ?
                        new Date(currentUser.metadata.creationTime).toLocaleDateString() :
                        'Información no disponible'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="p-6 space-y-6">
              {/* Change Password Section */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Lock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('changePasswordTitle')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t('changePasswordDescription')}
                    </p>
                  </div>
                </div>

                {!showChangePassword ? (
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Lock className="h-4 w-4" />
                    <span>{t('changePassword')}</span>
                  </button>
                ) : (
                  <div className="space-y-4">
                    {/* Current Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('currentPassword')}
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.current ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => handlePasswordInputChange('currentPassword', e.target.value)}
                          className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${passwordErrors.currentPassword
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-gray-300 focus:border-blue-500'
                            }`}
                          placeholder={t('currentPasswordPlaceholder')}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('current')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.current ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {passwordErrors.currentPassword && (
                        <p className="text-sm text-red-600 mt-1">{passwordErrors.currentPassword}</p>
                      )}
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('newPassword')}
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.new ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => handlePasswordInputChange('newPassword', e.target.value)}
                          className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${passwordErrors.newPassword
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-gray-300 focus:border-blue-500'
                            }`}
                          placeholder={t('newPasswordPlaceholder')}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('new')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.new ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {passwordErrors.newPassword && (
                        <p className="text-sm text-red-600 mt-1">{passwordErrors.newPassword}</p>
                      )}
                    </div>

                    {/* Confirm New Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('confirmNewPassword')}
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.confirm ? 'text' : 'password'}
                          value={passwordData.confirmNewPassword}
                          onChange={(e) => handlePasswordInputChange('confirmNewPassword', e.target.value)}
                          className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${passwordErrors.confirmNewPassword
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-gray-300 focus:border-blue-500'
                            }`}
                          placeholder={t('confirmNewPasswordPlaceholder')}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('confirm')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.confirm ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {passwordErrors.confirmNewPassword && (
                        <p className="text-sm text-red-600 mt-1">{passwordErrors.confirmNewPassword}</p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <button
                        onClick={handleChangePassword}
                        disabled={isChangingPassword}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isChangingPassword
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                      >
                        <Lock className="h-4 w-4" />
                        <span>
                          {isChangingPassword ? t('loading') : t('changePassword')}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setShowChangePassword(false);
                          setPasswordData({
                            currentPassword: '',
                            newPassword: '',
                            confirmNewPassword: ''
                          });
                          setPasswordErrors({});
                          setShowPasswords({
                            current: false,
                            new: false,
                            confirm: false
                          });
                        }}
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {t('cancel')}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Danger Zone */}
              <div className="border-2 border-red-200 rounded-xl p-6 bg-red-50">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">
                      {t('deleteAccount')}
                    </h3>
                    <p className="text-sm text-red-700 mb-4">
                      {t('deleteAccountDescription')}
                    </p>

                    {!showDeleteConfirm ? (
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>{t('deleteAccount')}</span>
                      </button>
                    ) : (
                      <div className="bg-white border-2 border-red-200 rounded-lg p-4 space-y-4">
                        <div className="text-red-800">
                          <div className="font-medium mb-2 flex items-center space-x-2">
                            <AlertTriangle className="h-5 w-5" />
                            <span>{t('deleteAccountWarning')}</span>
                          </div>
                          <p className="text-sm mb-4">
                            {t('confirmDeleteAccountPermanent')}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-red-700">
                            {t('typeDeleteToConfirm')}
                          </label>
                          <input
                            type="text"
                            value={deleteConfirmText}
                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            placeholder={getRequiredDeleteText()}
                          />
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={handleDeleteAccount}
                            disabled={!isDeleteConfirmValid || isDeleting}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isDeleteConfirmValid && !isDeleting
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>
                              {isDeleting ? t('loading') : t('deleteAccount')}
                            </span>
                          </button>

                          <button
                            onClick={() => {
                              setShowDeleteConfirm(false);
                              setDeleteConfirmText('');
                            }}
                            className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            {t('cancel')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreferencesModal; 