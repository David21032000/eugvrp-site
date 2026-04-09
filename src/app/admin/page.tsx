"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Flame,
  Truck,
  Users,
  Zap,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  AlertCircle,
  LogOut,
  User,
  MessageSquare,
  ChevronRight,
  Loader2,
  UserPlus,
  Trash2,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Application {
  id: string;
  discordUserId: string;
  discordUsername: string;
  faction: string;
  questions: string;
  status: string;
  reviewNote?: string;
  reviewedBy?: string;
  createdAt: string;
}

interface AdminUser {
  id: string;
  discordUsername: string;
  role: string;
}

const factionIcons: Record<string, any> = {
  police: Shield,
  firefighter: Flame,
  dot: Truck,
  staff: Users,
  sessionhost: Zap,
};

const factionColors: Record<string, string> = {
  police: "bg-blue-500",
  firefighter: "bg-red-500",
  dot: "bg-yellow-500",
  staff: "bg-purple-500",
  sessionhost: "bg-emerald-500",
};

const factionGradients: Record<string, string> = {
  police: "from-blue-500 to-cyan-500",
  firefighter: "from-red-500 to-orange-500",
  dot: "from-yellow-500 to-amber-500",
  staff: "from-purple-500 to-pink-500",
  sessionhost: "from-emerald-500 to-green-500",
};

const statusBadges: Record<string, any> = {
  pending: { icon: Clock, color: "bg-yellow-500", label: "În așteptare" },
  accepted: { icon: CheckCircle, color: "bg-green-500", label: "Acceptat" },
  rejected: { icon: XCircle, color: "bg-red-500", label: "Respins" },
};

export default function AdminPanel() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Admin users management
  const [adminUsers, setAdminUsers] = useState<Array<{ id: string; discordUsername: string; role: string; active: boolean }>>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserData, setNewUserData] = useState({
    discordUserId: "",
    discordUsername: "",
    password: "",
    role: "moderator",
  });
  const [isAddingUser, setIsAddingUser] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");
    if (token && user) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/applications");
      const data = await response.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setAdminUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching admin users:", error);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingUser(true);

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowAddUser(false);
        setNewUserData({
          discordUserId: "",
          discordUsername: "",
          password: "",
          role: "moderator",
        });
        fetchAdminUsers();
        alert("Utilizator creat cu succes!");
      } else {
        alert(data.error || "Eroare la crearea utilizatorului");
      }
    } catch (error) {
      alert("Eroare la crearea utilizatorului");
    } finally {
      setIsAddingUser(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi acest utilizator?")) return;

    try {
      const response = await fetch(`/api/admin/users?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchAdminUsers();
        alert("Utilizator șters cu succes!");
      } else {
        alert("Eroare la ștergerea utilizatorului");
      }
    } catch (error) {
      alert("Eroare la ștergerea utilizatorului");
    }
  };

  useEffect(() => {
    if (isAuthenticated && currentUser?.role === "admin") {
      fetchAdminUsers();
    }
  }, [isAuthenticated, currentUser]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.user));
        setIsAuthenticated(true);
        setCurrentUser(data.user);
      } else {
        setLoginError(data.error || "Autentificare eșuată");
      }
    } catch (error) {
      setLoginError("Eroare la autentificare. Încearcă din nou.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const updateStatus = async (id: string, status: 'accepted' | 'rejected') => {
    if (!currentUser) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status,
          reviewedBy: currentUser.discordUsername,
          reviewNote: reviewNote || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSelectedApp(null);
        setReviewNote("");
        fetchApplications();
      } else {
        alert(data.error || "Eroare la actualizarea aplicației");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Eroare la actualizarea aplicației");
    } finally {
      setIsUpdating(false);
    }
  };

  const formatQuestions = (questionsJson: string) => {
    try {
      return JSON.parse(questionsJson);
    } catch {
      return {};
    }
  };

  const getQuestionLabel = (key: string) => {
    const labels: Record<string, string> = {
      roblox_username: "Username Roblox",
      discord_tag: "Discord Tag",
      age: "Vârstă",
      experience: "Experiență",
      why_police: "De ce Poliție?",
      why_staff: "De ce Staff?",
      why_firefighter: "De ce Pompieri?",
      why_dot: "De ce DOT?",
      why_host: "De ce Session Host?",
      scenario1: "Scenariu 1",
      scenario2: "Scenariu 2",
      activity: "Activitate",
    };
    return labels[key] || key.replace(/_/g, " ");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="text-center">
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <User className="w-8 h-8 text-white" />
              </motion.div>
              <CardTitle className="text-2xl text-white">Admin Panel</CardTitle>
              <CardDescription className="text-white/60">
                Autentifică-te pentru a accesa panoul de administrare
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm"
                  >
                    {loginError}
                  </motion.div>
                )}
                <div>
                  <Input
                    type="text"
                    value={loginData.username}
                    onChange={(e) =>
                      setLoginData((prev) => ({ ...prev, username: e.target.value }))
                    }
                    placeholder="Username Discord"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData((prev) => ({ ...prev, password: e.target.value }))
                    }
                    placeholder="Parolă"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Se încarcă...
                    </>
                  ) : (
                    "Autentificare"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const pendingApps = applications.filter((app) => app.status === "pending");
  const acceptedApps = applications.filter((app) => app.status === "accepted");
  const rejectedApps = applications.filter((app) => app.status === "rejected");

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-white/60">
              Gestionează aplicațiile pentru facțiuni
            </p>
          </div>
          <div className="flex items-center gap-4">
            {currentUser && (
              <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <User className="w-3 h-3 mr-1" />
                {currentUser.discordUsername} ({currentUser.role})
              </Badge>
            )}
            <Button
              variant="outline"
              onClick={fetchApplications}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-white/20 text-white hover:bg-red-500/20 hover:border-red-500/50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Deconectare
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total Aplicații", value: applications.length, color: "bg-blue-500", gradient: "from-blue-500 to-cyan-500" },
            { label: "În Așteptare", value: pendingApps.length, color: "bg-yellow-500", gradient: "from-yellow-500 to-amber-500" },
            { label: "Acceptate", value: acceptedApps.length, color: "bg-green-500", gradient: "from-green-500 to-emerald-500" },
            { label: "Respinse", value: rejectedApps.length, color: "bg-red-500", gradient: "from-red-500 to-pink-500" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-white/5 border-white/10 overflow-hidden">
              <CardContent className="pt-6 relative">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.gradient}`} />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Faction Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Distribuție pe Facțiuni</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['police', 'firefighter', 'dot', 'staff', 'sessionhost'].map((faction) => {
              const count = applications.filter((app) => app.faction === faction).length;
              const pendingCount = applications.filter((app) => app.faction === faction && app.status === 'pending').length;
              const FactionIcon = factionIcons[faction] || User;

              return (
                <Card key={faction} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className={`w-10 h-10 rounded-xl ${factionColors[faction]} flex items-center justify-center mb-3`}>
                      <FactionIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">{count}</div>
                    <div className="text-white/60 text-sm">
                      {faction === 'sessionhost' ? 'Session Host' : faction.charAt(0).toUpperCase() + faction.slice(1)}
                    </div>
                    {pendingCount > 0 && (
                      <Badge className="mt-2 bg-yellow-500/20 text-yellow-300 text-xs">
                        {pendingCount} în așteptare
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Applications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="bg-white/5 border border-white/10 mb-6">
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
              >
                În Așteptare ({pendingApps.length})
              </TabsTrigger>
              <TabsTrigger
                value="accepted"
                className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
              >
                Acceptate ({acceptedApps.length})
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
              >
                Respinse ({rejectedApps.length})
              </TabsTrigger>
              {currentUser?.role === "admin" && (
                <TabsTrigger
                  value="users"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
                >
                  <Users className="w-4 h-4 mr-1" />
                  Admini
                </TabsTrigger>
              )}
            </TabsList>

            {["pending", "accepted", "rejected"].map((status) => {
              const apps = applications.filter((app) => app.status === status);
              return (
                <TabsContent key={status} value={status}>
                  {loading ? (
                    <div className="text-center py-12 text-white/40">
                      <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin" />
                      <p>Se încarcă aplicațiile...</p>
                    </div>
                  ) : apps.length === 0 ? (
                    <div className="text-center py-12 text-white/40">
                      <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                      <p>Nicio aplicație {status === "pending" ? "în așteptare" : status}</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {apps.map((app, index) => {
                        const FactionIcon = factionIcons[app.faction] || User;
                        const statusBadge = statusBadges[app.status];
                        const StatusIcon = statusBadge.icon;
                        const questions = formatQuestions(app.questions);

                        return (
                          <motion.div
                            key={app.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Card
                              className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
                              onClick={() => {
                                setSelectedApp(app);
                                setReviewNote(app.reviewNote || "");
                              }}
                            >
                              <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div
                                      className={`w-12 h-12 rounded-xl ${factionColors[app.faction]} flex items-center justify-center group-hover:scale-110 transition-transform`}
                                    >
                                      <FactionIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                      <h3 className="text-white font-semibold flex items-center gap-2">
                                        {app.discordUsername}
                                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </h3>
                                      <p className="text-white/60 text-sm">
                                        {questions.roblox_username || "N/A"} • {app.faction === 'sessionhost' ? 'Session Host' : app.faction}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <span className="text-white/40 text-sm">
                                      {new Date(app.createdAt).toLocaleDateString("ro-RO")}
                                    </span>
                                    <Badge
                                      className={`${statusBadge.color} text-white flex items-center gap-1`}
                                    >
                                      <StatusIcon className="w-3 h-3" />
                                      {statusBadge.label}
                                    </Badge>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </motion.div>
      </div>

      {/* Application Detail Dialog */}
      {selectedApp && (
        <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
          <DialogContent className="bg-gray-900/95 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl ${factionColors[selectedApp.faction]} flex items-center justify-center`}
                >
                  {(() => {
                    const Icon = factionIcons[selectedApp.faction] || User;
                    return <Icon className="w-5 h-5 text-white" />;
                  })()}
                </div>
                <div>
                  <div>Aplicație - {selectedApp.discordUsername}</div>
                  <div className="text-sm text-white/60 font-normal">
                    {selectedApp.faction === 'sessionhost' ? 'Session Host' : selectedApp.faction}
                  </div>
                </div>
              </DialogTitle>
              <DialogDescription className="text-white/60">
                Trimisă pe {new Date(selectedApp.createdAt).toLocaleString("ro-RO")}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {Object.entries(formatQuestions(selectedApp.questions)).map(([key, value]) => (
                <div key={key} className="bg-white/5 rounded-lg p-4">
                  <label className="text-white/60 text-sm block mb-1">
                    {getQuestionLabel(key)}
                  </label>
                  <p className="text-white">{String(value)}</p>
                </div>
              ))}

              {selectedApp.reviewedBy && (
                <div className="bg-white/5 rounded-lg p-4 border-l-4 border-purple-500">
                  <label className="text-white/60 text-sm block mb-1">Rezultat evaluare</label>
                  <p className="text-white">
                    <span className="text-purple-400">{selectedApp.reviewedBy}</span> • {" "}
                    {statusBadges[selectedApp.status]?.label}
                  </p>
                  {selectedApp.reviewNote && (
                    <p className="text-white/80 mt-2 text-sm italic">
                      &ldquo;{selectedApp.reviewNote}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </div>

            {selectedApp.status === "pending" && (
              <>
                <div className="mt-6">
                  <label className="text-white/60 text-sm block mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Notă de evaluare (opțional)
                  </label>
                  <Textarea
                    value={reviewNote}
                    onChange={(e) => setReviewNote(e.target.value)}
                    placeholder="Adaugă o notă sau motivul respingerii..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  <Button
                    onClick={() => updateStatus(selectedApp.id, "accepted")}
                    disabled={isUpdating}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    {isUpdating ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    Acceptă
                  </Button>
                  <Button
                    onClick={() => updateStatus(selectedApp.id, "rejected")}
                    disabled={isUpdating}
                    variant="destructive"
                    className="flex-1"
                  >
                    {isUpdating ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-2" />
                    )}
                    Respinge
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
