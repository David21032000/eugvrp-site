"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Flame,
  Truck,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  AlertCircle,
  LogOut,
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

interface Application {
  id: string;
  discordUserId: string;
  discordUsername: string;
  faction: string;
  questions: string;
  status: string;
  createdAt: string;
}

const factionIcons: Record<string, any> = {
  police: Shield,
  firefighter: Flame,
  dot: Truck,
  staff: Users,
};

const factionColors: Record<string, string> = {
  police: "bg-blue-500",
  firefighter: "bg-red-500",
  dot: "bg-yellow-500",
  staff: "bg-purple-500",
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
  const [password, setPassword] = useState("");

  const ADMIN_PASSWORD = "admin123"; // În producție, folosește NextAuth

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated]);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications");
      const data = await response.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Parolă incorectă!");
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      // Aici ar trebui să ai un endpoint PUT/PATCH pentru actualizare
      alert(`Status updated to ${status}`);
      setSelectedApp(null);
      fetchApplications();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const formatQuestions = (questionsJson: string) => {
    try {
      return JSON.parse(questionsJson);
    } catch {
      return {};
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Admin Panel</CardTitle>
              <CardDescription className="text-white/60">
                Accesează panoul de administrare
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parolă"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40"
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                >
                  Autentificare
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
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-white/60">
              Gestionează aplicațiile pentru facțiuni
            </p>
          </div>
          <div className="flex items-center gap-4">
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
              onClick={() => setIsAuthenticated(false)}
              className="border-white/20 text-white hover:bg-white/10"
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
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total Aplicații", value: applications.length, color: "bg-blue-500" },
            { label: "În Așteptare", value: pendingApps.length, color: "bg-yellow-500" },
            { label: "Acceptate", value: acceptedApps.length, color: "bg-green-500" },
            { label: "Respinse", value: rejectedApps.length, color: "bg-red-500" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-white/5 border-white/10">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Applications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="pending">
            <TabsList className="bg-white/5 border-white/10 mb-6">
              <TabsTrigger value="pending" className="data-[state=active]:bg-white/10">
                În Așteptare ({pendingApps.length})
              </TabsTrigger>
              <TabsTrigger value="accepted" className="data-[state=active]:bg-white/10">
                Acceptate ({acceptedApps.length})
              </TabsTrigger>
              <TabsTrigger value="rejected" className="data-[state=active]:bg-white/10">
                Respinse ({rejectedApps.length})
              </TabsTrigger>
            </TabsList>

            {["pending", "accepted", "rejected"].map((status) => {
              const apps = applications.filter((app) => app.status === status);
              return (
                <TabsContent key={status} value={status}>
                  {apps.length === 0 ? (
                    <div className="text-center py-12 text-white/40">
                      <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                      <p>Nicio aplicație {status === "pending" ? "în așteptare" : status}</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {apps.map((app) => {
                        const FactionIcon = factionIcons[app.faction] || Users;
                        const statusBadge = statusBadges[app.status];
                        const StatusIcon = statusBadge.icon;
                        const questions = formatQuestions(app.questions);

                        return (
                          <Card
                            key={app.id}
                            className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                            onClick={() => setSelectedApp(app)}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div
                                    className={`w-12 h-12 rounded-xl ${factionColors[app.faction]} flex items-center justify-center`}
                                  >
                                    <FactionIcon className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="text-white font-semibold">
                                      {app.discordUsername}
                                    </h3>
                                    <p className="text-white/60 text-sm">
                                      {questions.roblox_username || "N/A"} • {app.faction}
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
          <DialogContent className="bg-gray-900 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl ${factionColors[selectedApp.faction]} flex items-center justify-center`}
                >
                  {(() => {
                    const Icon = factionIcons[selectedApp.faction] || Users;
                    return <Icon className="w-5 h-5 text-white" />;
                  })()}
                </div>
                Aplicație - {selectedApp.discordUsername}
              </DialogTitle>
              <DialogDescription className="text-white/60">
                Trimisă pe {new Date(selectedApp.createdAt).toLocaleString("ro-RO")}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {Object.entries(formatQuestions(selectedApp.questions)).map(([key, value]) => (
                <div key={key} className="bg-white/5 rounded-lg p-4">
                  <label className="text-white/60 text-sm capitalize block mb-1">
                    {key.replace(/_/g, " ")}
                  </label>
                  <p className="text-white">{String(value)}</p>
                </div>
              ))}
            </div>

            {selectedApp.status === "pending" && (
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => updateStatus(selectedApp.id, "accepted")}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Acceptă
                </Button>
                <Button
                  onClick={() => updateStatus(selectedApp.id, "rejected")}
                  variant="destructive"
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Respinge
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
